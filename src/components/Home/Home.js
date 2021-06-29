import React from 'react';
import Project from '../Project/Project';
import './Home.css';
import landing_bg from './../../assets/landing_bg.svg';
import avatar from './../../assets/avatar.svg';
import ProjectCategories from '../ProjectCategories/ProjectCategories';
import SearchBox from '../SearchBox/SearchBox';
import TrendingProjects from '../TrendingProjects/TrendingProjects';
import { Link } from 'react-router-dom';

function Home() {
  const [isChange, setChange] = React.useState(false);

  const setChangedata = () => {
    setChange(true);
  };
  return (
    <div className='home'>
      <section
        className='landing'
        id='landing'
        style={{ background: `url(${landing_bg}) 75% 100%` }}>
        <div className='home_content'>
          <h3>Having Difficulties in</h3>
          <h1>finding projects ?</h1>
          <p>We are here to help you.</p>

          <Link to='/findprojects'> Find Projects </Link>
        </div>
        <div className='image'>
          <img src={avatar} alt='Welcome to ProjectZone' />
        </div>
      </section>

      <SearchBox setChangedata={setChangedata} />
      <ProjectCategories />
      <div className="home_projects">

      <div className='best_project'>
        <h1 className='best_project--title'>
           Best MERN Projects
        </h1>
        <div className='projects'>
          <Project
            title='E-Commerce Website like amazon'
            desc='This is a ecommerce website which has many facilities like order bucket, payment, product ratings any many more. so its a complete full stack project.'
            skills={['mongodb', 'express', 'react', 'node']}
            level='Beginner'
            rating={4}
          />
          <Project
            title='Food Delivery App'
            desc="Food Delivery App is a full-stack system build in MERN.js which aims to offer a customer a range of food products to order. Then the customer can choose and order a menu build on its own."
            skills={['mongodb', 'express', 'react', 'node']}
            level='Advance'
            rating={5}
          />
          <Project
            title='E-Learning Portal'
            desc='A simple web-based classroom application that allows instructors to add courses with lessons, while students can enroll in these courses and track their progress. - developed using React, Node, Express and MongoDB.'
            skills={['mongodb', 'express', 'react', 'node']}
            level='Advanced'
            rating={3}
          />
        </div>
      </div>

      <div className='best_project'>
        <h1 className='best_project--title'>
           Best Python Projects
        </h1>
        <div className='projects'>
          <Project
            title='Mad Libs Generator'
            desc='One of the best ideas to start experimenting you hands-on python projects for students is working on Mad Libs Generator. This is the perfect project for beginners who are just starting out with software development. Primarily focused on strings, variables, and concatenation, this project will teach you how to manipulate user-inputted data. The program design is such that it will ask users to enter a series of inputs that will be considered as a Mad Lib. Mab lib is one of the python projects for beginners.
The input could be anything, an adjective, a noun, a pronoun, etc. Once all the inputs are entered, the application will take the data and arrange the inputs into a story template form. Sound fun, right?'
            skills={['python', 'opencv']}
            level='Beginner'
            rating={5}
          />
          <Project
            title='Calculator'
            desc='Although there isn’t much use of a calculator, however, building your graphical UI calculator will make you familiar with a library like Tkinter in which you can create buttons to perform different operations and display results on a screen.'
            skills={['python']}
            level='intermediate'
            rating={4}
          />
          <Project
            title='Steganography'
            desc='Steganography is the art of hiding a secret message in another form of media, for example, hiding a coded message in an image or video. You can create a program that protects messages inside pictures for you.'
            skills={['python']}
            level='Advanced'
            rating={5}
          />

        </div>
      </div>

      <div className='best_project'>
        <h1 className='best_project--title'>
           Best JavaScript Projects
        </h1>
        <div className='projects'>
          <Project
            title='JavaScript Music Events'
            desc='Here, you are introduced to event listeners that will act on keyboard events. For example, if the ‘S’ key is pressed, what is the event that will happen? Each event will have a different code and action. Apart from event listeners, we will also learn how to add and play audio files. Note that we have added very basic CSS, as the focus here is on JavaScript. You will have to import your own sounds and background image for the program to work fully.'
            skills={['javascript']}
            level='intermediate'
            rating={4}
          />
          <Project
            title='JavaScript Form Validation'
            desc='Form validation is a very useful aspect and used by many websites for client-side validation of user details, card details, address details, etc. For example, if there is a mandatory input field name, the user may type a number or leave the field blank, type just one letter, etc. All these validations can be easily done using JavaScript. Let us see a simple form validation project. As usual, the project will need HTML elements as well. We have not done any extensive styling, just included basic elements in the HTML itself. Here is the complete code of a simple form with basic validations:'
            skills={['javascript']}
            level='intermediate'
            rating={4}
          />
          <Project
            title='Build a Shopping Cart for Order Fulfillment'
            desc='This is a full-fledged shopping cart for order fulfillment. The project also uses jQuery, but dont worry. If you dont know about jQuery, you can understand it without much effort. Learn the important concepts of jQuery on the go. This will be an awesome project to build because shopping websites are extremely popular today, more so because people have embraced digital shopping so much. Go through the project slowly and step-by-step. This is going to take time, but it is worth it!'
            skills={['javascript']}
            level='Advanced'
            rating={4}
          />

         </div>
       </div>
      </div>
    </div>
  );
}

export default Home;
