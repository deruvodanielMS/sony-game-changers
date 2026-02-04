const openapi = {
  openapi: '3.0.0',
  info: {
    title: 'Sony Gamechangers — API Reference',
    version: '1.0.0',
    description: 'Auto-hosted API reference for the app/api routes',
  },
  servers: [{ url: '/' }],
  paths: {
    '/api/goals': {
      get: {
        summary: 'List goals',
        responses: {
          '200': {
            description: 'A list of goals',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Goal' } },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a goal',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateGoalDTO' },
              example: {
                title: 'Increase customer retention by 5%',
                description: 'Improve onboarding and support to reduce churn',
                goalType: 'business',
                status: 'draft',
                assignedTo: 'user-123',
                periodId: 'period-2026-q1',
                progress: 0,
                goalAchievements: [{ title: 'Complete retention survey', progress: 'not-started' }],
                goalActions: [{ title: 'Implement onboarding email series' }],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Created',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Goal' } } },
          },
        },
      },
    },
    '/api/goals/{id}': {
      get: {
        summary: 'Get a single goal',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Goal' } } },
          },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not Found' },
        },
      },
      put: {
        summary: 'Update a goal',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/CreateGoalDTO' } },
          },
        },
        responses: {
          '200': {
            description: 'Updated',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Goal' } } },
          },
        },
      },
      delete: {
        summary: 'Delete a goal',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: { '204': { description: 'No Content' }, '401': { description: 'Unauthorized' } },
      },
    },
    '/api/user': {
      get: {
        summary: 'Get current user',
        parameters: [{ name: 'email', in: 'query', required: true, schema: { type: 'string' } }],
        responses: {
          '200': {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/User' } } },
          },
          '401': { description: 'Unauthorized' },
        },
      },
    },
  },
  components: {
    schemas: {
      Goal: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          status: { type: 'string', enum: ['completed', 'draft', 'awaiting_approval'] },
          goalType: {
            type: 'string',
            enum: ['business', 'personal_growth_and_development', 'manager_effectiveness'],
          },
          description: { type: 'string' },
          uid: { type: 'string' },
          userName: { type: 'string' },
          avatarUrl: { type: 'string' },
          progress: { type: 'number', format: 'int' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          parent: {
            type: 'object',
            nullable: true,
            properties: { id: { type: 'string' }, title: { type: 'string' } },
          },
          ladderedGoals: {
            type: 'array',
            items: { $ref: '#/components/schemas/GoalNested' },
          },
          goalAmbitions: { type: 'array', items: { $ref: '#/components/schemas/GoalAAA' } },
          goalAchievements: {
            type: 'array',
            items: { $ref: '#/components/schemas/GoalAchievement' },
          },
          goalActions: { type: 'array', items: { $ref: '#/components/schemas/GoalAAA' } },
        },
        required: ['id', 'title', 'uid', 'userName', 'progress', 'createdAt', 'updatedAt'],
      },

      // Helper type used to avoid infinite recursion for nested laddered goals
      GoalNested: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          status: { type: 'string', enum: ['completed', 'draft', 'awaiting_approval'] },
          goalType: {
            type: 'string',
            enum: ['business', 'personal_growth_and_development', 'manager_effectiveness'],
          },
          description: { type: 'string' },
          uid: { type: 'string' },
          userName: { type: 'string' },
          avatarUrl: { type: ['string', 'null'] },
          progress: { type: 'number', format: 'float' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          // Laddered goals do not include the `parent` property
        },
        required: ['id', 'title', 'uid', 'userName', 'progress', 'createdAt', 'updatedAt'],
      },

      GoalAAA: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          status: { type: 'string' },
        },
        required: ['id', 'title', 'status'],
      },

      GoalAchievement: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          status: { type: 'string' },
          progress: { type: 'string' },
        },
        required: ['id', 'title', 'status'],
      },

      CreateGoalDTO: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          goalType: {
            type: 'string',
            enum: ['business', 'personal_growth_and_development', 'manager_effectiveness'],
          },
          status: { type: 'string', enum: ['completed', 'draft', 'awaiting_approval'] },
          parentId: { type: 'string' },
          assignedTo: { type: 'string' },
          createdBy: { type: 'string' },
          periodId: { type: 'string' },
          progress: { type: 'number' },
          goalAchievements: {
            type: 'array',
            items: { $ref: '#/components/schemas/CreateGoalAchievementDTO' },
          },
          goalActions: {
            type: 'array',
            items: { $ref: '#/components/schemas/CreateGoalActionDTO' },
          },
        },
        required: ['title', 'goalType', 'status', 'assignedTo', 'periodId', 'progress'],
      },

      CreateGoalAchievementDTO: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          body: { type: 'string' },
          status: { type: 'string' },
          progress: { type: 'string' },
        },
        required: ['title'],
      },

      CreateGoalActionDTO: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          body: { type: 'string' },
          status: { type: 'string' },
        },
        required: ['title'],
      },
      User: {
        type: 'object',
        properties: {
          id: { type: ['string', 'null'] },
          email: { type: 'string' },
          name: { type: 'string' },
          lastname: { type: 'string' },
          profileImageUrl: { type: 'string' },
          employeeId: { type: ['string', 'null'] },
          workdayId: { type: ['string', 'null'] },
          status: { type: ['string', 'null'] },
          orgId: { type: 'string' },
          jobId: { type: 'string' },
        },
        required: ['email', 'name', 'lastname', 'orgId', 'jobId'],
      },
    },
  },
}

export async function GET() {
  const spec = JSON.stringify(openapi, null, 2)

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <title>API Reference</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
    <style>body{margin:0}#swagger-ui{height:100vh}</style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
    <script>
      window.onload = function() {
        const spec = ${spec}
        SwaggerUIBundle({
          spec,
          dom_id: '#swagger-ui',
          presets: [SwaggerUIBundle.presets.apis],
          layout: 'BaseLayout',
        })
      }
    </script>
  </body>
</html>`

  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}
