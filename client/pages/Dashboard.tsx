/** @jsx jsx */
import React from 'react'
import { Navigate } from "react-router-dom"
import { useQuery } from '@apollo/client'
import { jsx } from '@emotion/react'

import { GET_ACCOUNT } from '../graphql/queries'

import {
  styleWrapper,
  styleInnerWrapper,
} from '../styles/common'

const Dashboard = () => {
  const { loading, data } = useQuery(GET_ACCOUNT)

  if (loading) {
    return null
  }

  if (!data || !data.account) {
    return (
      <Navigate replace to="/" />
    )
  }

  return (
    <div css={styleWrapper}>
      <div css={styleInnerWrapper}>
        Dashboard page is accessible only if you are logged in.
      </div>
    </div>
  )
}

export default Dashboard
