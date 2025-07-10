import React from 'react'
import Layout from '@/pages/admin/component/layout/layout'
import Venue from "./venues/venue"
import Setting from "./settings/settings"
import Dashboard from './dashboard/dashboard'

export default function AdminPage() {
  return (
    <Layout>
      <Dashboard/>
      <Venue/>
      <Setting/>
    </Layout>
  )
}
