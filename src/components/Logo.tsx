import classNames from "classnames";
import conf from "conf";
import Image from "next/image";
import logo from "public/logo.png";
interface LogoProps {
  showName?: boolean;
  isWhite?: boolean;
  logo?: string;
  name?: string;
  className?: string;
  imgClassName?: string;
  unclickable?: boolean;
  urlOnClick?: string;
}

Logo.defaultProps = {
  showName: true,
  unclickable: false,
  urlOnClick: "/",
};

export default function Logo(props: LogoProps) {
  const className = classNames({
    "flex items-center": true,
    "text-white": props.isWhite,
    [props.className || ""]: props.className,
    "cursor-default": props.unclickable,
  });

  //if name given, don't show logo
  const logoSrc = props.logo ? props.logo : !props.name && logo;

  return (
    <a className={className} href={props.unclickable ? "#" : props.urlOnClick}>
      {/* if has name. dont show logo */}
      {logoSrc && (
        <div className="w-12 h-7 relative">
          <Image
            className={classNames({
              [props.imgClassName || ""]: props.imgClassName,
            })}
            src={logoSrc}
            alt="Organizer Logo"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
      {props.showName && (
        <span className="font-medium text-base ml-2.5">
          {props.name || conf.get("PROJECT_NAME")}
        </span>
      )}
    </a>
  );
}
