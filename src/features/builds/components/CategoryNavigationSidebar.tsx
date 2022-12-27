import { NavLink } from 'components'
import {
  CategoryNavigationSidebarWidth,
  NavbarHeight,
  PartsCategories,
  PartsCategoriesKr
} from 'constant'
import { useScrollbarWidth } from 'hooks'
import { FC } from 'react'
import styled from 'styled-components'
import { ElementDepth, media } from 'styles'

const Box = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white};
  border-left: 1px solid ${({ theme }) => theme.colors.primary200};
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.25);
  /* Default depth to build summary as it will replace build summary on mobile view */
  z-index: ${ElementDepth.parts.buildSummary};
  overflow: hidden;
  height: 100vh;
  position: sticky;

  ${media.mobile`
    box-shadow: none;
    width: ${CategoryNavigationSidebarWidth.mobile + 'px'};
    position: fixed;
    right: 0;
    bottom: 0;
  `}
  ${media.tablet`
    width: ${CategoryNavigationSidebarWidth.tablet + 'px'};
    position: fixed;
    right: 0;
    bottom: 0;
    height: calc(100vh - ${NavbarHeight + 'px'});
  `}
  ${media.desktopSmall`
    width: ${CategoryNavigationSidebarWidth.desktopSmall + 'px'};
  `}
  ${media.desktopLarge`
    width: ${CategoryNavigationSidebarWidth.desktopLarge + 'px'};
  `}
  ${media.desktop`
    /* This is to stay above global navbar */
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${ElementDepth.parts.sidebar};
  `}

  /* Show the sidebar on the right side by default */
  order: 2;

  /* On desktop devices, move the sidebar to left side */
  ${media.desktop`
    order: 1 !important;
  `}
`

const CategoriesBox = styled.div<{ scrollbarWidth: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  overscroll-behavior: contain;

  ${media.mobile`
    gap: 0;
    overflow-y: scroll;
    /* To account for 'Box' component's border-left  */
    margin-left: -1px;
    margin-right: ${(props: any) => -props.scrollbarWidth + 'px'};
  `}
  ${media.tablet`
    gap: 5px;
    overflow-y: scroll;
    margin-right: ${(props: any) => -props.scrollbarWidth + 'px'};
  `}
  ${media.desktopSmall`
    margin-top: 75px;
    gap: 15px;
  `}
  ${media.desktopLarge`
    margin-top: 120px;
    gap: 10px;
  `}
`

const LinkBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.white};
  flex-shrink: 0;

  a {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.active {
      /* @Issue: font-weight: 800 Korean not supported */
      font-weight: bold;
    }
  }

  ${media.mobile`
    height: 50px;
    border: 1px solid ${({ theme }) => theme.colors.primary200};
    margin-top: -1px;

    :hover {
      color: ${({ theme }) => theme.colors.blue300};
      border: 1px solid ${({ theme }) => theme.colors.blue300};
      z-index: 99999;
    }

    :has(a.active) {
      color: ${({ theme }) => theme.colors.blue300};
    }

    a {
      font-size: 12px;
    }
  `}

  ${media.tablet`
    height: 96px;

    :has(a.active) {
      color: ${({ theme }) => theme.colors.blue300};
    }

    a {
      font-size: 16px;
      gap: 5px;
    }
  `}

  ${media.desktopSmall`
    height: 75px;

    :hover {
      background-color: ${({ theme }) => theme.colors.primary100};
    }
    :has(a.active) {
      background-color: ${({ theme }) => theme.colors.primary100};
    }

    a {
      font-size: 12px;
      gap: 5px;
    }
  `}

  ${media.desktopLarge`
    width: 180px;
    height: 55px;
    border-radius: 5px;
    border: 1px solid transparent;
    transition-duration: 0.15s;
    
    :hover {
      background-color: ${({ theme }) => theme.colors.primary100};
      border: 1px solid ${({ theme }) => theme.colors.primary200};
    }

    :has(a.active) {
      background-color: ${({ theme }) => theme.colors.primary100};
      border: 1px solid ${({ theme }) => theme.colors.primary};
    }

    a {
      gap: 15px;
      flex-direction: row;
      justify-content: normal;
    }
  `}
`

const MenuIcon = styled.div<{ url: string }>`
  width: 35px;
  height: 35px;
  background-color: ${({ theme }) => theme.colors.primary};
  mask: url(${({ url }) => url}) center/contain no-repeat;

  ${media.mobile`
    display: none;
  `}

  ${media.tablet`
    width: 54px;
    height: 54px;
    &.active {
      background-color: ${({ theme }) => theme.colors.blue300};
    }
  `}

  ${media.desktopSmall`
    width: 45px;
    height: 45px;
  `}
  ${media.desktopLarge`
    margin-left: 25px;
  `}
`

const Categories = () => (
  <>
    {PartsCategories.map(category => (
      <LinkBox key={category}>
        <NavLink to={`/parts/${category}`}>
          {({ isActive }) => (
            <>
              <MenuIcon
                url={`../assets/icons/${category}.png`}
                className={isActive ? 'active' : ''}
              />
              <span>{PartsCategoriesKr[category]}</span>
            </>
          )}
        </NavLink>
      </LinkBox>
    ))}
  </>
)

export const CategoryNavigationSidebar: FC = () => {
  const scrollbarWidth = useScrollbarWidth()

  return (
    <Box>
      <CategoriesBox scrollbarWidth={scrollbarWidth}>
        <Categories />
      </CategoriesBox>
    </Box>
  )
}
