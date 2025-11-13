import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('HomePage')
  return (
    <>
      <section>
        <h1 className="text-h1 leading-h1 font-bold text-accent-primary mb-4">{t('title')}</h1>
        <p className="text-body leading-body text-neutral-600">
          Visual overview of colors, typography, and spacing defined in the theme.
        </p>
      </section>

      <section className="space-y-8">
        <h2 className="text-h2 leading-h2 font-semibold text-accent-primary">🎨 Color Palette</h2>

        <div>
          <h3 className="text-h3 leading-h3 font-semibold text-neutral-800 mb-4">Accent</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div className="p-4 rounded-lg bg-accent-primary text-white text-center">
              accent-primary
            </div>
            <div className="p-4 rounded-lg bg-accent-primary-dark text-white text-center">
              accent-primary-dark
            </div>
            <div className="p-4 rounded-lg bg-accent-highlight-subtle text-neutral-900 text-center">
              accent-highlight-subtle
            </div>
            <div className="p-4 rounded-lg bg-accent-highlight-default text-neutral-900 text-center">
              accent-highlight-default
            </div>
            <div className="p-4 rounded-lg bg-accent-border-active text-neutral-900 text-center">
              accent-border-active
            </div>
            <div className="p-4 rounded-lg bg-accent-overlay text-neutral-900 text-center">
              accent-overlay
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-h3 leading-h3 font-semibold text-neutral-800 mb-4">Neutral</h3>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-10 gap-4">
            <div className="p-4 rounded-lg bg-neutral-0 border text-neutral-900 text-center">0</div>
            <div className="p-4 rounded-lg bg-neutral-100 text-neutral-900 text-center">100</div>
            <div className="p-4 rounded-lg bg-neutral-200 text-neutral-900 text-center">200</div>
            <div className="p-4 rounded-lg bg-neutral-300 text-neutral-900 text-center">300</div>
            <div className="p-4 rounded-lg bg-neutral-400 text-neutral-900 text-center">400</div>
            <div className="p-4 rounded-lg bg-neutral-500 text-white text-center">500</div>
            <div className="p-4 rounded-lg bg-neutral-600 text-white text-center">600</div>
            <div className="p-4 rounded-lg bg-neutral-700 text-white text-center">700</div>
            <div className="p-4 rounded-lg bg-neutral-800 text-white text-center">800</div>
            <div className="p-4 rounded-lg bg-neutral-900 text-white text-center">900</div>
          </div>
        </div>

        <div>
          <h3 className="text-h3 leading-h3 font-semibold text-neutral-800 mb-4">
            Feedback Colors
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            <div className="p-4 rounded-lg bg-feedback-info-400 text-white text-center">Info</div>
            <div className="p-4 rounded-lg bg-feedback-success-400 text-white text-center">
              Success
            </div>
            <div className="p-4 rounded-lg bg-feedback-warning-400 text-neutral-900 text-center">
              Warning
            </div>
            <div className="p-4 rounded-lg bg-feedback-danger-400 text-white text-center">
              Danger
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-h2 leading-h2 font-semibold text-accent-primary">✍️ Typography</h2>

        <div className="space-y-4">
          <h1 className="text-h1 leading-h1 font-bold">Heading 1</h1>
          <h2 className="text-h2 leading-h2 font-semibold">Heading 2</h2>
          <h3 className="text-h3 leading-h3 font-semibold">Heading 3</h3>
          <h4 className="text-h4 leading-h4 font-semibold">Heading 4</h4>
          <h5 className="text-h5 leading-h5 font-medium">Heading 5</h5>
          <h6 className="text-h6 leading-h6 font-medium">Heading 6</h6>
          <p className="text-body leading-body text-neutral-700">
            Body text - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <p className="text-body-small leading-body-small text-neutral-600">
            Body small - Lorem ipsum dolor sit amet.
          </p>
          <p className="text-body-tiny leading-body-tiny text-neutral-500 uppercase tracking-wide">
            Body tiny - caption style
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <h2 className="text-h2 leading-h2 font-semibold text-accent-primary">📏 Spacing Scale</h2>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-accent-primary h-2 w-spacing-0_125"></div>
            <span className="text-body">0.125</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-accent-primary h-2 w-spacing-0_25"></div>
            <span className="text-body">0.25</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-accent-primary h-2 w-spacing-0_5"></div>
            <span className="text-body">0.5</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-accent-primary h-2 w-spacing-1"></div>
            <span className="text-body">1</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-accent-primary h-2 w-spacing-2"></div>
            <span className="text-body">2</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-accent-primary h-2 w-spacing-4"></div>
            <span className="text-body">4</span>
          </div>
        </div>
      </section>
    </>
  )
}
