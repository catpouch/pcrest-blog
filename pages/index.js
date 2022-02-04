import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Goat Scene and Herd</title>
      </Head>

      <main>
        <Header/>
        
      </main>
    </div>
  )
}
