import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Container, Nav, NavItem } from 'reactstrap'

class Layout extends React.Component {
  // static async getInitialProps ({ req }) {
  //   let pageProps = {}

  //   if (Component.getInitialProps) {
  //     pageProps = await Component.getInitialProps(ctx)
  //   }

  //   return { pageProps }
  // }

  render () {
    const { children } = this.props
    const title = 'get-fed'
    return (
      <div>
        <Head>
          <title>{title}</title>
          <meta charSet='utf-8' />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <link
            rel='stylesheet'
            href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
            integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
            crossOrigin='anonymous'
          />
        </Head>
        <header>
          <Nav className='navbar navbar-dark bg-dark'>
            <NavItem>
              <Link href='/'>
                <a className='navbar-brand'>Get Fed</a>
              </Link>
            </NavItem>
            <NavItem className='ml-auto'>
              <a className='nav-link'>Hi User</a>
            </NavItem>
            <NavItem>
              <Link href='/logout'>
                <a className='nav-link'> Log Out</a>
              </Link>
            </NavItem>
          </Nav>
        </header>
        <Container>{children}</Container>
      </div>
    )
  }
}

export default Layout
