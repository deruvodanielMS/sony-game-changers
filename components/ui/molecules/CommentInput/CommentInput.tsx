'use client'

import { useState, useCallback, KeyboardEvent } from 'react'
import { useTranslations } from 'next-intl'
import { Avatar } from '@/components/ui/atoms/Avatar'
import { TextArea } from '@/components/ui/atoms/TextArea'
import { Button } from '@/components/ui/atoms/Button'
import { Typography } from '@/components/ui/foundations/Typography'
import { cn } from '@/utils/cn'
import type { CommentInputProps } from './CommentInput.types'

const sizeMap = {
  sm: { height: 'h-18', textSize: 'text-sm' },
  md: { height: 'h-23', textSize: 'text-base' },
  lg: { height: 'h-28', textSize: 'text-base' },
}

/**
 * CommentInput - Textarea with avatar for adding comments
 *
 * A molecule component that combines an Avatar with a TextArea for comment input.
 * Supports Ctrl+Enter submission and character counting.
 *
 * @example
 * ```tsx
 * <CommentInput
 *   avatarSrc="/user.jpg"
 *   avatarAlt="John Doe"
 *   placeholder="Add a comment..."
 *   onSubmit={(value) => console.log(value)}
 * />
 * ```
 */
export function CommentInput({
  avatarSrc,
  avatarAlt,
  placeholder,
  value: controlledValue,
  defaultValue,
  onChange,
  onSubmit,
  onCancel,
  disabled,
  height,
  maxLength,
  showCharCount = false,
  showActions = false,
  size = 'md',
  avatarSize = 'md',
  className,
  textareaClassName,
  'data-test-id': dataTestId,
}: CommentInputProps) {
  const t = useTranslations('CommentInput')
  const [internalValue, setInternalValue] = useState(defaultValue || '')

  // Use controlled or uncontrolled value
  const value = controlledValue !== undefined ? controlledValue : internalValue
  const isControlled = controlledValue !== undefined

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value

      if (!isControlled) {
        setInternalValue(newValue)
      }

      onChange?.(newValue)
    },
    [isControlled, onChange],
  )

  const handleCancel = useCallback(() => {
    if (!isControlled) {
      setInternalValue('')
    }
    onCancel?.()
  }, [isControlled, onCancel])

  const handleSave = useCallback(() => {
    const trimmedValue = value.trim()
    if (trimmedValue && onSubmit) {
      onSubmit(trimmedValue)
      if (!isControlled) {
        setInternalValue('')
      }
    }
  }, [value, onSubmit, isControlled])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && onSubmit) {
        e.preventDefault()
        handleSave()
      }
    },
    [handleSave, onSubmit],
  )

  const charCount = value.length
  const isOverLimit = maxLength ? charCount > maxLength : false

  return (
    <div className="flex flex-col w-full gap-1">
      <div className={cn('flex items-start w-full gap-1', className)} data-testid={dataTestId}>
        <Avatar src={avatarSrc} alt={avatarAlt} size={avatarSize} />

        <div className="flex-1 flex flex-col gap-0.5">
          <TextArea
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder || t('placeholder')}
            disabled={disabled}
            resize="none"
            className={cn(
              sizeMap[size].height,
              sizeMap[size].textSize,
              'transition-shadow',
              textareaClassName,
            )}
            data-testid={dataTestId ? `${dataTestId}-textarea` : undefined}
            style={height ? { height } : undefined}
          />

          {showCharCount && maxLength && (
            <div className="flex justify-end">
              <Typography
                variant="bodySmall"
                className={cn(
                  'transition-colors',
                  isOverLimit ? 'text-feedback-error-600' : 'text-neutral-500',
                )}
              >
                {charCount}/{maxLength}
              </Typography>
            </div>
          )}

          {onSubmit && !showActions && (
            <Typography variant="bodySmall" className="text-neutral-500">
              {t('submitHint')}
            </Typography>
          )}
        </div>
      </div>

      {showActions && (
        <div className="flex gap-1 items-center justify-end">
          <Button
            variant="link"
            size="small"
            onClick={handleCancel}
            data-testid={dataTestId ? `${dataTestId}-cancel` : undefined}
          >
            {t('cancel')}
          </Button>
          <Button
            variant="secondary"
            size="small"
            onClick={handleSave}
            disabled={disabled || isOverLimit || value.trim().length === 0}
            data-testid={dataTestId ? `${dataTestId}-save` : undefined}
          >
            {t('save')}
          </Button>
        </div>
      )}
    </div>
  )
}

CommentInput.displayName = 'CommentInput'
