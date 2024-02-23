import packageInfo from "../../package.json";

export const Footer = () => {
  return (
    <div>
      <p className="mt-2">Colorful v{packageInfo.version}</p>
      <p>
        <a
          href="https://www.mattmcadams.com"
          className="underline"
          target="_blank"
        >
          Matt McAdams
        </a>{" "}
        &middot;{" "}
        <a
          href="https://github.com/MattMcAdams/color-tool"
          target="_blank"
          className="underline"
        >
          Open Source
        </a>{" "}
        &middot;{" "}
        <a
          className="underline"
          target="_blank"
          href="https://mattmcadams.com/donate"
        >
          Donate
        </a>
      </p>
    </div>
  );
};

export default Footer;
