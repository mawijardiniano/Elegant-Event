import React from 'react'
import Layout from '@/components/layout/layout'
import Hero from "@/components/homepage/hero"
import Venue from '@/components/homepage/venue'
import Services from '@/components/homepage/services'
import EventPackage from '@/components/homepage/eventPackage'
import Contact from '@/components/homepage/contact'

export default function Homepage() {
  return (
    <Layout>
     <Hero/>
     <Venue/>
     <Services/>
     <EventPackage/>
     <Contact/>
    </Layout>
  )
}
