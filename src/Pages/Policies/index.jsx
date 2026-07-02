import "./style.css";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Navbar, Footer } from "../../Components";

const Policies = () => {
    const { name } = useParams()
    const data = [
        {
            name: "aboutUs",
            body:
                <>
                    <h1>About Us</h1>
                    <p>
                        Zarovia embodies a vision centered around the celebration of elegance
                        and empowerment. From sleek, minimalist designs to expertly crafted,
                        timeless pieces, Zarovia offers a curated experience that blends
                        contemporary style with intricate detailing.
                    </p>
                    <p>
                        Zarovia embodies a vision centered around elegance and empowerment,
                        with a refined approach to fashion. Guided by a team of creative experts,
                        Zarovia has quickly gained recognition for its sophisticated style and
                        attention to detail. Our collections are designed for the modern,
                        confident woman who values both luxury and accessibility. At Zarovia,
                        we are dedicated to making high-end fashion more attainable, ensuring
                        every woman can experience the freedom, strength, and brilliance she
                        deserves. For us, fashion is not just about clothing—it's about empowering
                        women to shine in their own unique light.
                    </p>
                </>,
        },
        {
            name: "shippingPolicy",
            body:
                <>
                    <h1>Shipping policy</h1>
                    <p>
                        An estimated delivery time is displayed on the Order Summary page. Upon placing your order, you will receive an email containing a summary of the order and the estimated delivery time. Sometimes, deliveries may take longer due to bad weather, flight delays, political disruptions, or other unforeseen circumstances. In such cases, we will proactively reach out to you. Please check your emails regularly for updates.
                    </p>
                    <p>
                        Shipping costs are based on weight and are calculated at the time of item selection. To reflect the policies of the courier companies we use, all weights will be rounded up to the next full kilogram. For domestic orders within Pakistan, there are no charges.
                    </p>
                    <p>
                        Customers in Pakistan and internationally can expect to receive their orders according to the timelines specified on the product pages. For custom-made orders, the delivery time will be provided upon order confirmation.
                    </p>
                    <p>
                        Prices are inclusive of all local taxes. Any additional customs duties or taxes on international orders will be borne by the customer at the time of delivery.
                    </p>
                </>,
        },
        {
            name: "privacyPolicy",
            body:
                <>
                    <h1>Privacy policy</h1>
                    <p>
                        If you require any more information or have any questions about our privacy policy, please feel free to contact us by email at brand@zarovia.com.pk. At www.zarovia.com.pk, we consider the privacy of our visitors to be extremely important. This privacy policy document describes in detail the types of personal information collected and recorded by www.zarovia.com.pk and how we use it.
                    </p>
                    <h2>Log Files</h2>
                    <p>
                        Like many other websites, www.zarovia.com.pk makes use of log files. These files merely log visitors to the site, a standard procedure for hosting companies and a part of hosting services analytics. The information inside the log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date/time stamp, referring/exit pages, and possibly the number of clicks. This information is used to analyze trends, administer the site, track users' movement around the site, and gather demographic information. IP addresses and other such information are not linked to any information that is personally identifiable.
                    </p>
                    <h2>Cookies and Web Beacons</h2>
                    <p>
                    www.zarovia.com.pk uses cookies to store information about visitors’ preferences, to record user-specific information on which pages the site visitor accesses or visits, and to personalize or customize our web page content based upon visitors’ browser type or other information that the visitor sends via their browser.
                    </p>
                    <h2>DoubleClick DART Cookie</h2>
                    <p>
                        Google, as a third-party vendor, uses cookies to serve ads on www.zarovia.com.pk. Google’s use of the DART cookie enables it to serve ads to our site's visitors based upon their visit to www.zarovia.com.pk and other sites on the Internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at the following URL: http://www.google.com/privacy_ads.html.
                    </p>
                    <h2>Third-Party Privacy Policies</h2>
                    <p>
                        You should consult the respective privacy policies of these third-party ad servers for more detailed information on their practices as well as for instructions on how to opt out of certain practices. The www.zarovia.com.pk privacy policy does not apply to, and we cannot control the activities of, such other advertisers or websites. You may find a comprehensive listing of these privacy policies and their links here: Privacy Policy Links.
                        <br />
                        If you wish to disable cookies, you may do so through your individual browser options. More detailed information about cookie management with specific web browsers can be found at the browser's respective websites. What Are Cookies?
                    </p>
                    <h2>Online Privacy Policy Only</h2>
                    <p>
                        This privacy policy applies only to our online activities and is valid for visitors to our website regarding information shared and/or collected there.
                        <br />
                        This policy does not apply to any information collected offline or via channels other than this website.
                    </p>
                    <h2>Consent</h2>
                    <p>
                        By using our website, you hereby consent to our privacy policy and agree to its terms.
                    </p>
                </>,
        },
        {
            name: "returnAndExchangePolicy",
            body:
                <>
                    <h1>Return & Exchange Policy</h1>
                    <p>
                        Zarovia offers a straightforward and hassle-free Return and Exchange policy for products purchased from the Website, provided the following conditions are met:
                    </p>
                    <ul>
                        <li>
                            This policy is applicable for online orders only and for the Saga & Heritage collection.
                        </li>
                        <li>
                            You must be located in Pakistan, as this facility is not available to customers outside Pakistan.
                        </li>
                        <li>
                            Products must be returned/received by “Zarovia” within 5 (five) days from the date they are delivered/received by you.
                        </li>
                        <li>
                            In case of a return, we will provide store credit to our customers, which is valid for 3 months.
                        </li>
                        <li>
                            Bridal and customized orders cannot be returned or exchanged.
                        </li>
                        <li>
                            We will gladly accept any unworn, unwashed product with original tags attached for a return or an exchange. The product must be returned in its original condition along with the invoice, all labels attached, price tags attached, dust bags, and other packaging intact, and sold as part of the product.
                        </li>
                        <li>
                            Please return the product with the Return/Exchange Form filled out properly (provided when the order is delivered to you and available at the end of this page).
                        </li>
                        <li>
                            Customers need to return/exchange the product via traceable delivery, i.e., courier or registered post, at their own expense to our address mentioned below. If we don’t receive the product within the stipulated time or for any reason, the customer will not be eligible for return or exchange.
                        </li>
                        <li>
                            All returns/exchanges should be sent to Fashion Pakistan Lounge, 165-P, Near Mini Market Gulberg – 2, Lahore.
                        </li>
                        <li>
                            Customers can exchange for another item, but any additional cost will have to be paid by the customer.
                        </li>
                        <li>
                            In case of selecting a lower-priced item, the remaining amount will be given to the customer as online store credit.
                        </li>
                        <li>
                            In case the requested exchange item(s) are out of stock or not available, we’ll give you the store credit of the item’s invoice value.
                        </li>
                        <li>
                            In case of any “change of mind” in prepaid orders, partial refunds are possible within 2 days after placing your order. You are requested to notify us through a written request (Email/WhatsApp). An example of a partial refund is if you place an order for 2 or more items and then decide not to buy one or more items. We will refund your partial amount within 7 working days.
                        </li>
                        <li>
                            For local online orders only, store credit will be given in case of a returned product.
                        </li>
                        <li>
                            All returned/exchanged products will be subject to inspection before the refund or exchange is approved.
                        </li>
                        <li>
                            There will be no refund for shipping and handling costs.
                        </li>
                        <li>
                            For further queries about returns and exchanges, please contact us at contact@zarovia.com.pk
                        </li>
                    </ul>
                    <h2>MISCELLANEOUS</h2>
                    <ul>
                        <li>
                            In case of a conflict in any terms of the Returns and Exchange Policy, the decision of Zarovia shall be final and conclusive, and you irrevocably withdraw your right to make any claim or demand on this ground.
                        </li>
                        <li>
                            Notwithstanding anything contained in this policy, Zarovia reserves the right to reject any request for return and/or exchange of any products without giving any reasons for the same. In such cases, products will be sent back to the customer at the original shipping address.
                        </li>
                    </ul>
                    <h2>INCORRECT PRODUCTS</h2>
                    <p>
                        For the purpose of this policy, the term ‘incorrect product’ means the product does not match the description or specification set out in the purchase order or website with respect to color, size, or material. It is mentioned on the website that the actual colors may vary from the color displayed on your device.
                    </p>
                </>,
        },
        {
            name: "termsAndConditions",
            body:
                <>
                    <h1>Terms and Conditions</h1>
                    <p>
                        Copyright and all other intellectual property rights in the content of this Site, including trademarks, names, and logos, are either registered or unregistered trademarks owned by and licensed to Zarovia. All rights are reserved.
                    </p>
                    <p>
                        Content on the Site may be accessed for your internal, non-commercial use only. You may not copy, perform, publish, modify, transfer, create derivative works from, commercially exploit, or otherwise use any content, software, products, or services obtained from this Site, in whole or in part.
                    </p>
                    <p>
                        You may not delete or alter any copyright, trademark, intellectual property, or other legal notices from any part of this Site.Prices are inclusive of all local taxes. Any additional customs duties or taxes on international orders will be borne by the customer at the time of delivery.
                    </p>
                    <p>
                        You must keep any password assigned to you strictly confidential and not disclose it to anyone else. Unauthorized use of this Site, including unauthorized entry, misuse of passwords, or misuse of any information, is strictly prohibited.
                    </p>
                    <p>
                        You may not use this Site in any manner that could damage, disable, overburden, or impair the Site or interfere with any other party's access to and use of the Site.
                    </p>
                </>,
        },
        {
            name: "termsOfService",
            body:
                <>
                    <h1>Terms of service</h1>
                    <h2>OVERVIEW</h2>
                    <p>
                        This website is operated by Zarovia. Throughout the site, the terms “we,” “us,” and “our” refer to Zarovia. Zarovia offers this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
                    </p>
                    <p>
                        By visiting our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions (“Terms of Service,” “Terms”), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including, without limitation, users who are browsers, vendors, customers, merchants, and/or contributors of content.
                    </p>
                    <p>
                        Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.
                    </p>
                    <p>
                        Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change, or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
                    </p>
                    <p>
                        Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.
                    </p>
                    <h2>
                        SECTION 1 - ONLINE STORE TERMS
                    </h2>
                    <p>
                        By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). You must not transmit any worms, viruses, or any code of a destructive nature. A breach or violation of any of the Terms will result in an immediate termination of your Services.
                    </p>
                    <h2>SECTION 2 - GENERAL CONDITIONS</h2>
                    <p>
                        We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (excluding credit card information), may be transferred unencrypted and involve (a) transmissions over various networks, and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Credit card information is always encrypted during transfer over networks. You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us. The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms.
                    </p>
                    <h2>SECTION 3 - ACCURACY, COMPLETENESS, AND TIMELINESS OF INFORMATION</h2>
                    <p>
                        We are not responsible if information made available on this site is not accurate, complete, or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete, or more timely sources of information. Any reliance on the material on this site is at your own risk. This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only. We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.
                    </p>
                    <h2>SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES</h2>
                    <p>
                        Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third party for any modification, price change, suspension, or discontinuance of the Service.
                    </p>
                    <h2>SECTION 5 - PRODUCTS OR SERVICES (if applicable)</h2>
                    <p>
                        Certain products or services may be available exclusively online through the website. These products or services may have limited quantities and are subject to return or exchange only according to our Return Policy. We have made every effort to display as accurately as possible the colors and images of our products that appear in the store. We cannot guarantee that your computer monitor's display of any color will be accurate. We reserve the right, but are not obligated, to limit the sales of our products or Services to any person, geographic region, or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change at any time without notice, at our sole discretion. We reserve the right to discontinue any product at any time. Any offer for any product or service made on this site is void where prohibited. We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
                    </p>
                    <h2>SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION</h2>
                    <p>
                        We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole judgment, appear to be placed by dealers, resellers, or distributors.
                    </p>
                    <p>
                        You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store. You agree to promptly update your account and other information, including your email address and credit card numbers and expiration dates, so that we can complete your transactions and contact you as needed.
                    </p>
                    <p>
                        For more details, please review our <Link to="/policies/returnAndExchangePolicy">Returns Policy</Link>.
                    </p>
                    <h2>SECTION 7 - OPTIONAL TOOLS</h2>
                    <p>
                        We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we provide access to such tools “as is” and “as available” without any warranties, representations, or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools. Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with and approve of the terms on which tools are provided by the relevant third-party provider(s). We may also, in the future, offer new services and/or features through the website (including the release of new tools and resources). Such new features and/or services shall also be subject to these Terms of Service.
                    </p>
                    <h2>SECTION 8 - THIRD-PARTY LINKS</h2>
                    <p>
                        Certain content, products, and services available via our Service may include materials from third parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third parties. We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third party's policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third party.
                    </p>
                    <h2>SECTION 9 - USER COMMENTS, FEEDBACK, AND OTHER SUBMISSIONS</h2>
                    <p>
                        If, at our request, you send certain specific submissions (for example contest entries) or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are and shall be under no obligation (1) to maintain any comments in confidence; (2) to pay compensation for any comments; or (3) to respond to any comments. We may, but have no obligation to, monitor, edit or remove content that we determine in our sole discretion to be unlawful, offensive, threatening, libelous, defamatory, pornographic, obscene, or otherwise objectionable or violates any party’s intellectual property or these Terms of Service. You agree that your comments will not violate any right of any third party, including copyright, trademark, privacy, personality, or other personal or proprietary right. You further agree that your comments will not contain libelous or otherwise unlawful, abusive, or obscene material, or contain any computer virus or other malware that could in any way affect the operation of the Service or any related website. You may not use a false email address, pretend to be someone other than yourself, or otherwise mislead us or third parties as to the origin of any comments. You are solely responsible for any comments you make and their accuracy. We take no responsibility and assume no liability for any comments posted by you or any third party.
                    </p>
                    <h2>SECTION 10 - PERSONAL INFORMATION</h2>
                    <p>
                        Your submission of personal information through the store is governed by our Privacy Policy. To view our
                        <Link to="/policies/privacyPolicy">
                            Privacy Policy.
                        </Link>
                    </p>
                    <h2>SECTION 11 - ERRORS, INACCURACIES, AND OMISSIONS</h2>
                    <p>
                        Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies, or omissions that may relate to product descriptions, pricing, promotions, offers, product shipping charges, transit times, and availability. We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice (including after you have submitted your order). We undertake no obligation to update, amend or clarify information in the Service or on any related website, including without limitation, pricing information, except as required by law. No specified update or refresh date applied in the Service or on any related website should be taken to indicate that all information in the Service or on any related website has been modified or updated.
                    </p>
                    <h2>SECTION 12 - PROHIBITED USES</h2>
                    <p>
                        In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites, or the Internet. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.
                    </p>
                    <h2>SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY</h2>
                    <p>
                        We do not guarantee, represent, or warrant that your use of our service will be uninterrupted, timely, secure, or error-free. We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable. You agree that from time to time we may remove the service for indefinite periods of time or cancel the service at any time, without notice to you. You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties, or conditions of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness for a particular purpose, durability, title, and non-infringement. In no case shall Zarovia, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers, or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the maximum extent permitted by law.
                    </p>
                    <h2>SECTION 14 - INDEMNIFICATION</h2>
                    <p>
                        You agree to indemnify, defend, and hold harmless Zarovia and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, interns, and employees, harmless from any claim or demand, including reasonable attorneys’ fees, made by any third party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third party.
                    </p>
                    <h2>SECTION 15 - SEVERABILITY</h2>
                    <p>
                        In the event that any provision of these Terms of Service is determined to be unlawful, void, or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.
                    </p>
                    <h2>SECTION 16 - TERMINATION</h2>
                    <p>
                        The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes. These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site. If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may deny you access to our Services (or any part thereof).
                    </p>
                    <h2>SECTION 17 - ENTIRE AGREEMENT</h2>
                    <p>
                        The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision. These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications, and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service). Any ambiguities in the interpretation of these Terms of Service shall not be construed against the drafting party.
                    </p>
                    <h2>SECTION 18 - GOVERNING LAW</h2>
                    <p>
                        These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of 303, Kingdom Tower, Riyadh, 12611-3129, Saudi Arabia.
                    </p>
                    <h2>SECTION 19 - CHANGES TO TERMS OF SERVICE</h2>
                    <p>
                        You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change, or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.
                    </p>
                    <h2>SECTION 20 - CONTACT INFORMATION</h2>
                    <p>
                        Questions about the Terms of Service should be sent to us at privacy@zarovia.com.pk.
                    </p>
                </>,
        },
        {
            name: "refundPolicy",
            body:
                <>
                    <h1>Refund policy</h1>
                    <h2>WE DON’T HAVE REFUND POLICY FOR DOMESTIC & INTERNATIONAL CUSTOMERS.</h2>
                    <ul>
                        <li style={{ fontWeight: "600" }}>
                            Refund/Partial Refund is only applicable before the order is being dispatched.
                        </li>
                        <li style={{ fontWeight: "600" }}>
                            Partial Refund:
                        </li>
                    </ul>
                    <p>
                        In Prepaid Orders, Partial refund is possible within 2 days after placing your order. You are requested to intimate us through written request i.e. (Email/WhatsApp). Example of Partial Refund is that if you place an order for 2 or more item’s and after placing the order, you decided not to buy one or more item. We will refund your partial amount within 7 working days.
                    </p>
                    <br />
                    <ul style={{ listStyleType: "number" }}>
                        <li>
                            For international orders, we do not offer Return/Exchanges unless we deliver the incorrect order or the product is faulty. For international orders, we Recommend Customers to make a video while opening a package as poof of damage or In-correct order.
                        </li>
                        <li>
                            For products on Sale, we do not offer exchanges unless we deliver the incorrect order.
                        </li>
                    </ul>
                    <br />

                    <h2>Return/Exchange Procedure</h2>
                    <p>
                        Any product bought from Zarovia’s online store can be returned or exchanged through the online store only, provided it is unused and has the label and tag in their original state. Please read the Return & Exchange Policy.
                    </p>
                    <p>
                        You can contact our customer service center by email at contact@zarovia.com.pk and send your item to: 165-P, Mini Market, Gulberg-2.
                    </p>

                </>,
        },
    ];
    const content = data.find(v => v.name === name);
    return (
        <>
            <Navbar />
            <div className="main-about-page-div">
                <Container>
                    <div className="content-body">
                        {content.body}
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Policies;