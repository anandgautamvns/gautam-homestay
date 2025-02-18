import { Carousel, Image } from 'antd'
import React from 'react'
import styles from './index.module.scss'

import Image1 from '../../assets/images/image1.png'
import Image2 from '../../assets/images/image2.jpg'
import Image3 from '../../assets/images/image3.jpg'
import Image4 from '../../assets/images/image4.jpg'


const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const Home = () => {
  const imageList = [{ id: 1, image: Image1 }, { id: 2, image: Image2 }, { id: 3, image: Image3 }, { id: 4, image: Image4 }]
  return (
    <div className={styles.container}>
      <div className={styles.carouselWrapper}>
        <Carousel autoplay>
          {imageList.map((item, index) => (
            <div key={item.id} className={styles.imageContainer}>
              <Image
                key={index}
                className={styles.image}
                preview={false}
                src={item.image}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  )
}

export default Home