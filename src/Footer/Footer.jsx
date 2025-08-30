import { FaLinkedin, FaGithub, FaInstagram} from "react-icons/fa";

export default function Footer(){
    return(
        <>
         <footer className="bg-black h-[100px] text-center text-lg p-4"> 
        <p className="text-white font-bold mt-0">connect:</p>
      <div className="flex justify-center py-2 gap-6">
      <a
        href="https://www.linkedin.com/in/srikanthmudugula/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-blue-500 hover:scale-130  transition-transform"
      >
        <FaLinkedin size={20} />
      </a>
      <a
        href="https://github.com/srikanthmudugula"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-100 hover:scale-130 transition-transform"
      >
        <FaGithub size={20} />
      </a>
      <a
        href="https://www.instagram.com/urs___srikanth/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-pink-700 hover:scale-130 transition-transform"
      >
        <FaInstagram size={20} />
      </a>
      </div>
    </footer>
        </>
    );
}