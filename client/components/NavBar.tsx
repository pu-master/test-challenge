/** @jsx jsx */
import React from 'react'
import { Link } from "react-router-dom"
import { useQuery } from '@apollo/client'
import { useCookies } from 'react-cookie'
import { css, jsx } from '@emotion/react'

import { COOKIE_TOKEN } from '../constants'
import { GET_ACCOUNT } from '../graphql/queries'

const style = css`
  text-align: center;

  li {
    display: inline-block;
  }

  li + li {
    margin-left: 16px;
  }

  a {
    color: #fff;
  }
`

function NavBar() {
  const { client, data } = useQuery(GET_ACCOUNT)

  const [cookies, setCookie, removeCookie] = useCookies([COOKIE_TOKEN])

  const handleLogout = (event: React.SyntheticEvent) => {
    event.preventDefault()
    client.resetStore()
    removeCookie(COOKIE_TOKEN)
  }

  const renderLinks = () => {
    if (!data || !data.account) {
      // When not logged in.
      return (
        <React.Fragment>
          <li>
            <Link to="/">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
        </React.Fragment>
      )
    }

    // When logged in.
    return (
      <React.Fragment>
        <li>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </React.Fragment>
    )
  }

  return (
    <ul css={style}>
      { renderLinks() }
    </ul>
  )
}

export default NavBar
