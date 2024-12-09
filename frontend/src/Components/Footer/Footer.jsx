import { Footer as FlowbiteFooter } from "flowbite-react";
import { BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

function Footer() {
  return (
    <FlowbiteFooter container>
      <div className="w-full relative bottom-0">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-8">
          {/* <div className="flex justify-center sm:justify-start"> */}
            <div className="flex items-center gap-2 lg:ml-4 md:ml-2 ml-0 ">
            <img src="/TEN_LOGO.jpeg" className="h-11 w-11 rounded-full" />
            <span className="text-2xl sm:text-sm md:text-xl xl:text-3xl text-gray-900 dark:text-white">
              TEN Fashion
            </span>
            </div>
          {/* </div> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 sm:gap-6">
            <div>
              <FlowbiteFooter.Title title="Categories" />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link href="/shop/mens">
                  Mens
                </FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="/shop/womens">
                  Womens
                </FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="/shop/kids">
                  Kids
                </FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
            <div>
              <FlowbiteFooter.Title title="Company" />
              <FlowbiteFooter.LinkGroup col>
                <FlowbiteFooter.Link href="/about-us">
                  About
                </FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="/">Careers</FlowbiteFooter.Link>
                <FlowbiteFooter.Link href="/">Brand</FlowbiteFooter.Link>
              </FlowbiteFooter.LinkGroup>
            </div>
          </div>
          <div>
            <FlowbiteFooter.Title title="Legal" />
            <FlowbiteFooter.LinkGroup col>
              <FlowbiteFooter.Link href="/">Privacy Policy</FlowbiteFooter.Link>
              <FlowbiteFooter.Link href="/">
                Terms & Conditions
              </FlowbiteFooter.Link>
            </FlowbiteFooter.LinkGroup>
          </div>
        </div>
        <FlowbiteFooter.Divider />
        <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <FlowbiteFooter.Copyright
            href="#"
            by="The Entrepreneurship Network"
            year={2024}
          />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FlowbiteFooter.Icon href="/" icon={BsFacebook} />
            <FlowbiteFooter.Icon href="/" icon={BsInstagram} />
            <FlowbiteFooter.Icon href="/" icon={BsTwitter} />
            <FlowbiteFooter.Icon href="/" icon={BsGithub} />
          </div>
        </div>
      </div>
    </FlowbiteFooter>
  );
}

export default Footer;
