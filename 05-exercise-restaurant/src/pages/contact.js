const createContactPage = function() {
  const contactPage = document.createElement('div');

  contactPage.innerHTML = `
    <div style="font-size: 24px; font-weight: bold;"> Contact </div>
    <div>
      <br> Reservations</br>
      <a href="#"> +91 (80) 4120-8600 </a> <br>
    </div>
    <div>
      <br> General Inquires <br>
      <a href="#"> contactus@solitontech.com </a>
    </div>
    <div>
      <br> Private Events <br>
      <a href="#"> vignesh.shankar@solitontech.com </a>
    </div>
    <div>
      <br> Locate Us <br>
      <a href="https://goo.gl/maps/oTcvaqm6YQx" target="_blank" rel="noopener">
        Soliton Technologies Pvt Ltd <br>
        #683, 15th Cross Road <br>
        J.P. Nagar 2nd Phase <br>
        Bangalore – 560078 <br>
      </a>
      <div class="holds-the-iframe">
        <iframe allowtransparency="true" frameborder="0" scrolling="no"
          style="width: 100%; height: 200px; margin-top: 10px; margin-bottom: 10px;"
          src="//www.weebly.com/weebly/apps/generateMap.php?map=google&amp;elementid=440022561986929268&amp;ineditor=0&amp;control=3&amp;width=auto&amp;height=200px&amp;overviewmap=0&amp;scalecontrol=0&amp;typecontrol=0&amp;zoom=16&amp;lat=12.906580&amp;long=77.594127&amp;domain=www&amp;point=1&amp;align=2&amp;reseller=false">
        </iframe>
      </div>
    </div>`;

  return contactPage;
};

export { createContactPage };
