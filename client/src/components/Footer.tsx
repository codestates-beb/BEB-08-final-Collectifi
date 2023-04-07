import React from 'react';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const FooterWrapper = styled.div`
  background-color: #101522;
  margin-top: 20px;
  width: 100%;
`;
const FooterPadding = styled.div`
  padding: 4rem 4rem;
  display: flex;
  flex-direction: column;
`;
const FooterLinks = styled.div`
    display: flex;
    justify-content: space-between;
    align-items; flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    text-align: left;
    margin-bottom: 2rem;
`;
const FooterLinksDiv = styled.div`
  width: 150px;
  margin: 1rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  color: rgb(175, 175, 179);
`;
const Link2 = styled(Link)`
  color: rgb(175, 175, 179);
  text-decoration: none;
`;
const Socialmedia = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;
interface ImgProps {
  color: '#ff0000' | '#1da1f2' | '#0077b5' | '#c32aa3' | '#1877f2';
}
const Img = styled(Link)<ImgProps>`
  color: rgb(175, 175, 179);
  width: 80%;
  font-size: 25px;
  cursor: pointer;
  &:hover {
    color: ${props => props.color};
    transition: 0.3s ease-out;
  }
`;
const H4 = styled.h4`
  color: #9a6aff;
  font-size: 16px;
  line-height: 17px;
  margin-bottom: 0.9rem;
`;
const P = styled.p`
  font-size: 14px;
  line-height: 15px;
  margin: 0.5rem 0;
  cursor: pointer;
  &:hover {
    color: white;
    transition: 0.3s ease-out;
  }
`;
const FooterBelow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.2rem;
`;
const FooterBelowLinks = styled.div`
  display: flex;
  flex-direction: row;
`;
const BelowP = styled.p`
  font-size: 14px;
  line-height: 15px;
  margin-left: 2rem;
  color: rgb(175, 175, 179);
  font-weight: 600;
`;
const Hr = styled.hr`
  color: rgb(175, 175, 179) !important;
  width: 100%;
`;
const FooterCopyrightP = styled.div`
  font-size: 14px;
  line-height: 15px;
  color: rgb(175, 175, 179);
  font-weight: 600;
`;

function Footer() {
  return (
    <FooterWrapper className="footer">
      <FooterPadding className="sb__footer section__padding">
        <FooterLinks className="sb__footer-links">
          <FooterLinksDiv className="sb__footer-links_div">
            <H4>For Business</H4>
            <Link2 to="">
              <P>Employer</P>
            </Link2>
            <Link2 to="">
              <P>Health Plan</P>
            </Link2>
            <Link2 to="">
              <P>Individual</P>
            </Link2>
          </FooterLinksDiv>

          <FooterLinksDiv className="sb__footer-links_div">
            <H4>Resources</H4>
            <Link2 to="">
              <P>resource center</P>
            </Link2>
            <Link2 to="">
              <P>Testimonials</P>
            </Link2>
            <Link2 to="">
              <P>STV</P>
            </Link2>
          </FooterLinksDiv>

          <FooterLinksDiv className="sb__footer-links_div">
            <H4>Partners</H4>
            <Link2 to="">
              <P>Swing Tech</P>
            </Link2>
          </FooterLinksDiv>
          <FooterLinksDiv className="sb__footer-links_div">
            <H4>Company</H4>
            <Link2 to="">
              <P>About</P>
            </Link2>
            <Link2 to="">
              <P>Prress</P>
            </Link2>
            <Link2 to="">
              <P>Career</P>
            </Link2>
            <Link2 to="">
              <P>Contact</P>
            </Link2>
          </FooterLinksDiv>
          <FooterLinksDiv className="sb__footer-links_div">
            <H4>SNS</H4>
            <Socialmedia className="socialmedia">
              <Img to="" color="#1da1f2">
                <FontAwesomeIcon icon={faTwitter} />
              </Img>
              <Img to="" color="#ff0000">
                <FontAwesomeIcon icon={faYoutube} />
              </Img>
              <Img to="" color="#0077b5">
                <FontAwesomeIcon icon={faLinkedin} />
              </Img>
              <Img to="" color="#c32aa3">
                <FontAwesomeIcon icon={faInstagram} />
              </Img>
              <Img to="" color="#1877f2">
                <FontAwesomeIcon icon={faFacebook} />
              </Img>
            </Socialmedia>
          </FooterLinksDiv>
        </FooterLinks>
        <Hr></Hr>
        <FooterBelow className="sb__footer-below">
          <div className="sb__footer-copyright">
            <FooterCopyrightP>
              Copyrightⓒ {new Date().getFullYear()} TeamFinalInc. All right reserved.
            </FooterCopyrightP>
          </div>
          <FooterBelowLinks className="sb__footer-below-links">
            <Link2 to="">
              <div>
                <BelowP>Terms &Conditions</BelowP>
              </div>
            </Link2>
            <Link2 to="">
              <div>
                <BelowP>Privacy</BelowP>
              </div>
            </Link2>
            <Link2 to="">
              <div>
                <BelowP>Security</BelowP>
              </div>
            </Link2>
            <Link2 to="">
              <div>
                <BelowP>Cookie Declaration</BelowP>
              </div>
            </Link2>
          </FooterBelowLinks>
        </FooterBelow>
      </FooterPadding>
    </FooterWrapper>
  );
}

export default Footer;
