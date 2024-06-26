import React from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import logo from '../../../Photos/logo.png';

const LandingPage = () => (
    <div className="landing-container">
        <div className="auth-buttons">
            <Link to="/login" className="landing-btn login-btn">Login</Link>
        </div>
        <div className="header-overlay-box">
            <header className="landing-header">
                <img src={logo} alt="Waste To Taste Logo" className="landing-logo" />
                <h1>Waste To Taste</h1>
                <p>Your journey towards sustainable cooking and reducing food waste starts here.</p>
                <p className="mission-statement">
                    At Waste To Taste, we believe in making the most out of every ingredient. Our mission is to inspire you to cook sustainably, 
                    save money, and enjoy delicious meals that are good for you and the planet. Discover practical cooking skills, savvy shopping 
                    and storing tips, and a world of recipes designed to reduce food waste and transform your kitchen into a hub of creativity and 
                    sustainability.
                </p>
            </header>
        </div>
        <div className="overlay-box">
            <section className="info-section">
                <div className="info-section">
  <h2>Learn New Culinary Techniques</h2>
  <p><strong>Explore our vast library of recipes and culinary skills designed to empower your cooking journey.</strong></p>

  <h3>Mastering the Art of Sautéing: A Comprehensive Guide</h3>
  <p>Sautéing, from the French word "sauter" meaning to jump, is a fundamental cooking technique that every home cook and professional chef should master. 
    It's not just about tossing ingredients in a pan; it's an art that, when perfected, can transform simple ingredients into a gourmet meal. This comprehensive 
    guide will explore the nuances of sautéing, covering everything from the basics to advanced tips and tricks, ensuring you can elevate your culinary 
    skills to new heights. </p>

  <h4>The Basics of Sautéing</h4>
  <p>Sautéing involves cooking food quickly in a small amount of fat or oil over medium-high heat. This technique is ideal for tender vegetables, thin 
    cuts of meat, or any ingredient that benefits from a crisp, brown exterior and a tender, moist interior. The key to sautéing is to use a pan that 
    conducts heat well, such as a stainless steel or cast-iron skillet, and to keep the ingredients moving by tossing or stirring frequently.</p>

  <h4>Choosing Your Fat</h4>
  <p>The choice of fat is crucial in sautéing. Butter offers a rich flavor but can burn easily due to its lower smoke point. Oils, such as olive or 
    canola, are more heat-tolerant and suitable for higher temperatures. For a gourmet twist, consider using a combination of oil and butter; the oil 
    raises the smoke point while the butter adds flavor.</p>

  <h4>Preparing Ingredients</h4>
  <p>Uniformity is paramount in sautéing. Ingredients should be cut into even, bite-sized pieces to ensure they cook evenly. Dry your ingredients 
    thoroughly before adding them to the pan; moisture can lower the pan's temperature, leading to steaming rather than sautéing.</p>

  <h4>The Art of Heating</h4>
  <p>Preheat your pan over medium-high heat before adding the fat. To test if the pan is ready, add a single drop of water; it should sizzle and 
    evaporate on contact. Once the fat is shimmering but not smoking, it's time to add your ingredients.</p>

  <h4>Mastering Movement</h4>
  <p>The signature "jump" of sautéing is achieved through constant movement. Use a spatula to stir ingredients or, for the more adventurous, toss 
    them by quickly jerking the pan forward and upward. This ensures that all surfaces of the ingredients come into direct contact with the hot pan, 
    creating a beautifully browned exterior without overcooking the interior.</p>

  <h4>Advanced Techniques and Tips</h4>
  <ul>
    <li><strong>Deglazing:</strong> After sautéing, a fond (brown bits) often forms on the bottom of the pan. Deglaze with a liquid like wine, broth, 
    or water, and scrape these bits up. This technique not only cleans your pan but also creates a flavorful base for sauces.</li>
    <li><strong>Seasoning:</strong> Season your ingredients sparingly at the start. As ingredients cook down, their flavors concentrate. You can always 
    add more seasoning at the end, but you can't take it away.</li>
    <li><strong>Heat Management:</strong> If your ingredients start to burn or the pan becomes too hot, don't hesitate to reduce the heat. It's crucial 
    to find a balance between maintaining a high temperature for browning and preventing burning.</li>
    <li><strong>Adding Aromatics:</strong> Garlic, onions, and herbs can burn quickly and should be added after the main ingredients have begun to brown, 
    ensuring they impart flavor without charring.</li>
  </ul>

  <h4>Sautéing Beyond the Basics</h4>
  <p>Once you've mastered basic sautéing, experiment with incorporating this technique into more complex dishes. Sautéed vegetables can add a flavorful 
    layer to casseroles, and sautéed meats can be the star of a stir-fry. The possibilities are endless once you understand the fundamental principles of 
    sautéing.</p>

  <h4>Why Sautéing ?</h4>
  <p>Sautéing is more than just a cooking technique; it's a gateway to culinary creativity. By understanding the science behind it and practicing the art 
    of it, you can transform simple ingredients into extraordinary dishes. Remember, great cooking isn't just about following recipes—it's about mastering 
    techniques and then using them to express your culinary vision.</p>
</div>

            </section>
        </div>
    </div>
);
export default LandingPage;

