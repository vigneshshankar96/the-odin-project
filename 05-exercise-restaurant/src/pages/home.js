const createHomePage = function() {
  const homePage = document.createElement('div');

  homePage.innerHTML = `
    <div class="home-container">
      <div class="home-page-banner">
        <img src="./assets/brand-logo.png">
        <div class="home-page-text">
          <h1> SEMICONDUCTOR VALIDATION </h1>
          <h1> AND TEST AUTOMATION </h1>
          <h4> CODE LESS. DO MORE. </h4>
        </div>
      </div>
    </div>
    `;

  return homePage;
};

export { createHomePage };