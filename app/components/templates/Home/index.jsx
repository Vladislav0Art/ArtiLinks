import React from 'react';
// modules
import { 
  Header, 
  Footer, 
  InfoBlock, 
  ActionBlock
} from '../../modules';
// images
import img1 from '/public/svg/landing/img1.svg';
import img2 from '/public/svg/landing/img2.svg';
import img3 from '/public/svg/landing/img3.svg';



const Home = () => {
  return (
    <>
      <Header />
      <InfoBlock
        src={img1.src}
        title="All important links are in your hand"
        titleWidth={619}
        descr="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      />

      <InfoBlock
        src={img2.src}
        title="Share useful links with other people"
        titleWidth={630}
        descr="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        align='right'
      />

      <InfoBlock
        src={img3.src}
        title="Everything is stored and categorised in one place"
        titleWidth={830}
        descr="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
      />

      <ActionBlock />
      <Footer />
    </>
  );
};

export default Home;
