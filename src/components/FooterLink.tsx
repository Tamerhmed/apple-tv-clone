// Footer Link Component
interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => (
  <a
    href={href}
    className='text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm block py-1'
  >
    {children}
  </a>
);

export default FooterLink;
