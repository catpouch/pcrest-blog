import Image from 'next/image'

export default function Header() {
    return (
        <div>
            <div className='top-0 w-screen h-64 flex justify-center items-center flex-col'>
                <div className='absolute h-64 w-full z-0'>
                    <Image src='https://i.redd.it/3eealqlmb8m61.jpg' layout='fill' />
                </div>
                <div className='z-10'>
                    <div className='text-7xl text-center text-white'> The Goat Scene & Herd </div>
                    <div className='text-2xl text-center mt-4 text-white'> To Inform and Entertain the Pacific Crest Community </div>
                </div>
            </div>
            <div className='top-0 w-screen h-10 sticky'>
                INSERT BUTTONS HERE
            </div>
        </div>
    )
}