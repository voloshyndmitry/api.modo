import { ClientView, Payment } from "./types";

/**
 *
 * @param data
 * @param payments
 */
export function emailPaymentNotification(
  data: ClientView,
  payments: Payment[]
): string {
  const getFormattedDate = (timestamp) => {
    const date = new Date(Number(timestamp));
    const month = date.getUTCMonth() + 1; //months from 1-12
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const currentDate = getFormattedDate(new Date().getTime());

  const lastPaymentByClientId = payments
    ?.sort((next, prev) => Number(prev.date) - Number(next.date))
    .find(
      (payment) =>
        payment.clientId === data.id &&
        payment.title.toLowerCase() === "membership"
    );

  const date = Number(lastPaymentByClientId?.date ?? new Date().getTime());
  const fromDate = getFormattedDate(
    new Date(date).setMonth(new Date(date).getMonth() + 1)
  );
  const toDate = getFormattedDate(
    new Date(date).setMonth(new Date(date).getMonth() + 2)
  );

  const originalPrice = data.price / 1.05;
  const priceWithoutTaxes = originalPrice.toFixed(2);
  const taxes = (originalPrice * 0.05).toFixed(2);

  return `
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml"  ><head>
<meta charset="utf-8"> 
<meta name="viewport" content="width=device-width"> 
<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
<meta name="x-apple-disable-message-reformatting"> 
<title></title> 
<style id="" media="all">/* latin-ext */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh7USSwaPGQ3q5d0N7w.woff2) format('woff2');
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh7USSwiPGQ3q5d0.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2) format('woff2');
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXiWtFCc.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
/* latin-ext */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwaPGQ3q5d0N7w.woff2) format('woff2');
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url(/fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>

<style>

        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
        html,
body {
    margin: 0 auto !important;
    padding: 0 !important;
    height: 100% !important;
    width: 100% !important;
    background: #f1f1f1;
}

/* What it does: Stops email clients resizing small text. */
* {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}

/* What it does: Centers email on Android 4.4 */
div[style*="margin: 16px 0"] {
    margin: 0 !important;
}

/* What it does: Stops Outlook from adding extra spacing to tables. */
table,
td {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}

/* What it does: Fixes webkit padding issue. */
table {
    border-spacing: 0 !important;
    border-collapse: collapse !important;
    table-layout: fixed !important;
}

/* What it does: Uses a better rendering method when resizing images in IE. */
img {
    -ms-interpolation-mode:bicubic;
}

/* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
a {
    text-decoration: none;
}

/* What it does: A work-around for email clients meddling in triggered links. */
*[x-apple-data-detectors],  /* iOS */
.unstyle-auto-detected-links *,
.aBn {
    border-bottom: 0 !important;
    cursor: default !important;
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
}

/* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
.a6S {
    display: none !important;
    opacity: 0.01 !important;
}

/* What it does: Prevents Gmail from changing the text color in conversation threads. */
.im {
    color: inherit !important;
}

/* If the above doesn't work, add a .g-img class to any image in question. */
img.g-img + div {
    display: none !important;
}

/* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
/* Create one of these media queries for each additional viewport size you'd like to fix */

/* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
    u ~ div .email-container {
        min-width: 320px !important;
    }
}
/* iPhone 6, 6S, 7, 8, and X */
@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
    u ~ div .email-container {
        min-width: 375px !important;
    }
}
/* iPhone 6+, 7+, and 8+ */
@media only screen and (min-device-width: 414px) {
    u ~ div .email-container {
        min-width: 414px !important;
    }
}

    </style>


<style>

	    .primary{
	background: #30e3ca;
}
.bg_white{
	background: #ffffff;
}
.bg_light{
	background: #fafafa;
}
.bg_black{
	background: #000000;
}
.bg_dark{
	background: rgba(0,0,0,.8);
}
.email-section{
	padding:2.5em;
}

/*BUTTON*/
.btn{
	padding: 10px 15px;
	display: inline-block;
}
.btn.btn-primary{
	border-radius: 5px;
	background: #30e3ca;
	color: #ffffff;
}
.btn.btn-white{
	border-radius: 5px;
	background: #ffffff;
	color: #000000;
}
.btn.btn-white-outline{
	border-radius: 5px;
	background: transparent;
	border: 1px solid #fff;
	color: #fff;
}
.btn.btn-black-outline{
	border-radius: 0px;
	background: transparent;
	border: 2px solid #000;
	color: #000;
	font-weight: 700;
}

h1,h2,h3,h4,h5,h6{
	font-family: 'Lato', sans-serif;
	color: #000000;
	margin-top: 0;
	font-weight: 400;
}

body{
	font-family: 'Lato', sans-serif;
	font-weight: 400;
	font-size: 15px;
	line-height: 1.8;
	color: rgba(0,0,0,.4);
}

a{
	color: #30e3ca;
}

table{
}
/*LOGO*/

.logo h1{
	margin: 0;
}
.logo h1 a{
	color: #30e3ca;
	font-size: 24px;
	font-weight: 700;
	font-family: 'Lato', sans-serif;
}

/*HERO*/
.hero{
	position: relative;
	z-index: 0;
}

.hero .text{
	color: rgba(0,0,0,.3);
}
.hero .text h2{
	color: #000;
	font-size: 40px;
	margin-bottom: 0;
	font-weight: 400;
	line-height: 1.4;
}
.hero .text h3{
	font-size: 24px;
	font-weight: 300;
}
.hero .text h2 span{
	font-weight: 600;
	color: #30e3ca;
}


/*HEADING SECTION*/
.heading-section{
}
.heading-section h2{
	color: #000000;
	font-size: 28px;
	margin-top: 0;
	line-height: 1.4;
	font-weight: 400;
}
.heading-section .subheading{
	margin-bottom: 20px !important;
	display: inline-block;
	font-size: 13px;
	text-transform: uppercase;
	letter-spacing: 2px;
	color: rgba(0,0,0,.4);
	position: relative;
}
.heading-section .subheading::after{
	position: absolute;
	left: 0;
	right: 0;
	bottom: -10px;
	content: '';
	width: 100%;
	height: 2px;
	background: #30e3ca;
	margin: 0 auto;
}

.heading-section-white{
	color: rgba(255,255,255,.8);
}
.heading-section-white h2{
	font-family: 
	line-height: 1;
	padding-bottom: 0;
}
.heading-section-white h2{
	color: #ffffff;
}
.heading-section-white .subheading{
	margin-bottom: 0;
	display: inline-block;
	font-size: 13px;
	text-transform: uppercase;
	letter-spacing: 2px;
	color: rgba(255,255,255,.4);
}


ul.social{
	padding: 0;
}
ul.social li{
	display: inline-block;
	margin-right: 10px;
}

/*FOOTER*/

.footer{
	border-top: 1px solid rgba(0,0,0,.05);
	color: rgba(0,0,0,.5);
}
.footer .heading{
	color: #000;
	font-size: 20px;
}
.footer ul{
	margin: 0;
	padding: 0;
}
.footer ul li{
	list-style: none;
	margin-bottom: 10px;
}
.footer ul li a{
	color: rgba(0,0,0,1);
}

.section-divider {
    border-top: 1px solid rgba(0,0,0,.05);
}

@media screen and (max-width: 500px) {}

</style>
<meta name="robots" content="noindex, follow">
</head>
<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
<center style="width: 100%; background-color: #f1f1f1;">
<div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;
</div>
<div style="max-width: 600px; margin: 0 auto;" class="email-container">

<table
  align="center"
  role="presentation"
  cellspacing="0"
  cellpadding="0"
  border="0"
  width="100%"
  style="margin: auto">
  <tbody>
    <tr>
      <td colspan="5" class="hero bg_white"  style="padding: 3em 0 2em 2em">
          <table>
            <tr>
              <td>&nbsp;</td>
            </tr>
            <tr>
              <td><b>CHAMPION Sport Club Inc.</b></td>
            </tr>
            <tr>
              <td>12686 48 St SE, Calgary, T2Z 0B1</td>
            </tr>
            <tr>
              <td>Phone: (587) 837 0453</td>
            </tr>
            <tr>
              <td><a href="https://championclub.ca/">championclub.ca</a></td>
            </tr>
            <tr>
              <td>&nbsp;</td>
            </tr>
          </table>
      </td>
      <td colspan="5" class="hero bg_white" style="padding: 3em 2em 2em 0">
        <img
          alt="CHAMPION KARATE"
          src="https://champion.my-crm.pro/assets/img/champion-text-logo.png"
          alt=""
          style="width: 100%; max-width: 300px; height: auto; margin: auto; display: block" />
      </td>
    </tr>
    <tr class="section-divider">
      <td colspan="10" class="hero bg_white" style="padding: 3em 2em 3em 2em">
        <table align="center" style="border: 1px solid grey">
          <tr>
            <td colspan="4" style="text-align: center;"><b>Please pay:</b></td>
          </tr>
          <tr>
            <td colspan="4" style="text-align: center; padding-bottom: 1em;">${data.price}</td>
          </tr>
          <tr>
            <td colspan="4" style="text-align: center; padding: 1em 1em 0 1em; border-top: 1px solid grey"><b>Payment type:</b> INTERAC e-Transfer</td>
          </tr>
          <tr>
            <td colspan="4" style="text-align: center; padding: 0 1em">to <b>payment@championclub.ca</b></td>
          </tr>
          <tr>
            <td colspan="4" style="text-align: center;">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr class="section-divider">
      <td valign="top" colspan="3" class="hero bg_white" style="min-width: 100px; padding: 3em 0 4em 1em">
        <table>
          <tr>
            <td><b>Date</b></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>${currentDate}</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>    
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
          <tr>    
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td>&nbsp;</td>
          </tr>
        </table>
      </td>
      <td valign="top" colspan="4" class="hero bg_white" style="padding: 3em 0 4em 0">
        <table>
          <tr>
            <td colspan="2"><b>Description</b></td>
          </tr>
          <tr>    
            <td colspan="2">&nbsp;</td>
          </tr>
          <tr>    
            <td colspan="2">Membership from ${fromDate} - ${toDate}</td>
          </tr>
          <tr>    
            <td colspan="2">&nbsp;</td>
          </tr>
          <tr>    
            <td colspan="2">GST 5%</td>
          </tr>
          <tr>    
            <td colspan="2">&nbsp;</td>
          </tr>
          <tr>    
            <td colspan="2">Total</td>
          </tr>
          <tr>    
            <td colspan="2">&nbsp;</td>
          </tr>
          <tr>    
            <td colspan="2">&nbsp;</td>
          </tr>
        </table>
       </td>
      <td valign="top" colspan="3" class="hero bg_white" style="padding: 3em 1em 4em 0">
        <table>
          <tr>
            <td><b>Total</b></td>
          </tr>
          <tr>    
            <td>&nbsp;</td>
          </tr>
          <tr>    
            <td>${priceWithoutTaxes} CAD</td>
          </tr>
          <tr>    
            <td>&nbsp;</td>
          </tr>
          <tr>    
            <td>${taxes} CAD</td>
          </tr>
          <tr>    
            <td>&nbsp;</td>
          </tr>
          <tr>    
            <td>${data.price}</td>
          </tr>
          <tr>    
            <td>&nbsp;</td>
          </tr>
          <tr>    
            <td>&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<table
  align="center"
  role="presentation"
  cellspacing="0"
  cellpadding="0"
  border="0"
  width="100%"
  style="margin: auto">
  <tbody>
    <tr>
      <td valign="middle" class="bg_light footer email-section">
        <table>
          <tbody>
            <tr>
              <td valign="top" width="33.333%" style="padding-top: 20px">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tbody>
                    <tr>
                      <td style="text-align: left; padding-right: 10px">
                        <h3 class="heading">About</h3>
                        <p>
                          Champion Karate is a business name used by The Champion Sport Club Inc.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td valign="top" width="33.333%" style="padding-top: 20px">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tbody>
                    <tr>
                      <td style="text-align: left; padding-left: 5px; padding-right: 5px">
                        <h3 class="heading">Contact Info</h3>
                        <ul>
                          <li><span class="text">phone: (587) 838 0453</span></li>
                          <li><span class="text">12686 48 St SE, Calgary, AB, T2Z 0B1</span></li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td valign="top" width="33.333%" style="padding-top: 20px">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tbody>
                    <tr>
                      <td style="text-align: left; padding-left: 10px">
                        <h3 class="heading">Useful Links</h3>
                        <ul>
                          <li><a href="https://www.championclub.ca">Home</a></li>
                          <li><a href="https://championclub.ca/waivers">Waivers</a></li>
                          <li>
                            <a href="https://championclub.ca/belt-graduation">Belt Graduation</a>
                          </li>
                          <li><a href="https://championclub.ca/workshop">Workshop</a></li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
</div>
</center>





</body></html>`;
}
