import {vi} from 'vitest'

export default {
  TitleSection(props) {
    const mock = vi.fn()
    mock(props)
  },
  DescriptionSection() {},
  AboutSection() {},
  BookNowSection() {},
  FavoritesSection() {}
}
