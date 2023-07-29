import { FaCopyright } from 'react-icons/fa';

function Footer() {

    const footerYear = new Date().getFullYear();

    return (
        <div className="footer p-10 bg-grey-700 text-primary-content footer-center">
            <FaCopyright className='text-5xl' />
            <p>Copyright &copy; {footerYear} All rights reserved</p>
        </div>
    )
}

export default Footer;