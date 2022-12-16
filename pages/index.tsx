import CustomAnchor from '@components/CustomAnchor'
import Layout from '@components/Layout'
import ProjectContainer from '@components/ProjectContainer'
import ShufflingText from '../components/ShufflingText'
import { ReactElement } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className='px-10 flex flex-grow flex-wrap'>
            <section className='flex justify-center items-center p-5 basis-full'>
                <ShufflingText
                    className='inline-block text-5xl after:content-["\200B"] text-center' // after prevents resize when shuffling Text is empty
                    textArr={[
                        'Typescript',
                        'Javascript',
                        'React',
                        'NextJS',
                        'CSS/SCSS',
                    ]}
                />

            </section>

            <section className='flex justify-evenly flex-wrap basis-full'>

                <ProjectContainer src='/passenger.png' alt='Planeboarding background Image' bgSrc='planeBoarding.mp4'>
                    <div className='p-5 w-full h-full flex flex-col'>
                        A customizable simulation of 9 different plane boarding methods.
                        <br />
                        Uses Next and Typescript

                        <CustomAnchor liveHref='https://duck-shop.vercel.app/' gitHubHref='https://github.com/TheLostCar/duck-shop'>
                            Live Demo
                        </CustomAnchor>
                    </div>

                </ProjectContainer>

                <ProjectContainer src='/duckLogo.png' alt='Duck Shop background Image' bgSrc='duckShop.mp4'>
                    <div className='p-5 w-full h-full flex flex-col'>
                        Full stack duck shop.<br />
                        Uses MongoDB, Nextjs, and Cloudinary.

                        <CustomAnchor liveHref='https://duck-shop.vercel.app/' gitHubHref='https://www.github.com/TheLostCar/duck-shop'>
                            Live Demo
                        </CustomAnchor>

                    </div>
                </ProjectContainer>


                <ProjectContainer src='/moreSoonWhiteFlat.png' alt='More Soon background Image'>
                    <div className='aspect-square rounded-xl p-5 flex justify-center content-center flex-wrap'>
                        <span>
                            soon?
                        </span>
                    </div>
                </ProjectContainer>

            </section>

        </div>
    )
}


Home.getLayout = (page: ReactElement) => (
    <Layout text='Contact' href='/contact'>
        {page}
    </Layout>
)