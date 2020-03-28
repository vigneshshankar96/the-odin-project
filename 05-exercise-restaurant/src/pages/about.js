const createAboutPage = function() {
  const aboutPage = document.createElement('div');

  aboutPage.innerHTML = `
    <div style="font-size: 24px; font-weight: bold;"> About </div>
    <br/> We are a technology company driven by passion and values. Our passion is to build a technology company that is known for integrity, innovation, and excellence. We have delivered over 1000 solutions and continue to make pioneering contributions in the following areas <br/>
    <br/>
      <div class="sub-heading"> Semiconductor </div>
      <div class="sub-text-container">
        <div>- Everything Post-Silicon</div>
        <div>- Characterization / Post-Silicon Validation</div>
        <div>- Production Test Engineering</div>
        <div>- IC Evaluation Kits / Reference Designs</div>
      </div>
      <div class="sub-heading"> Platform Solutions </div>
      <div class="sub-text-container">
        <div>- Code Less. Do More.</div>
        <div>- Test &amp; Measurement Automation.</div>
        <div>- Embedded Systems, IoT Solutions</div>
        <div>- Web Technologies &amp; Data Analytics</div>
      </div>
      <div class="sub-heading"> Artificial Intelligence </div>
      <div class="sub-text-container">
        <div>- Data Science</div>
        <div>- Machine Learning</div>
        <div>- Waveform Analysis</div>
      </div>
    </div>`;

  return aboutPage;
};

export { createAboutPage };
