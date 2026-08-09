import { BRAND, SHOW_BRAND_LOGO } from '../../content/siteConfig'

export function BrandMark({
  imageClassName,
  placeholderClassName,
}: {
  imageClassName: string
  placeholderClassName: string
}) {
  if (SHOW_BRAND_LOGO) {
    return <img src={BRAND.logoSrc} alt={BRAND.name} className={imageClassName} />
  }

  return (
    <div
      aria-label={BRAND.logoPlaceholder}
      className={placeholderClassName}
    >
      {BRAND.logoPlaceholder}
    </div>
  )
}
