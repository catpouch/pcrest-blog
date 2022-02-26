import '../styles/globals.scss'
import { SessionProvider } from 'next-auth/react'
import Header from '../components/Header'
import Toolbar from '../components/Toolbar'

export default function Blog({Component, pageProps: {session, ...pageProps}}) {
    return (
        <SessionProvider session={session}>
            <Header/>
            <Toolbar/>
            <Component {...pageProps}/>
        </SessionProvider>
    )
}