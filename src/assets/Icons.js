import React from "react";
let size_style = {
  display: "flex",
  width: "14px",
  height: "14px",
  justifyContent: "center",
  alignItems: "center",
};
let size_style_volume = {
  width: "22px",
  height: "22px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const Play = (props) => {
  const size = props.size ? props.size + "px" : "14px";
  let styling = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: size,
    height: size,
  };
  return (
    <div style={styling}>
      <svg
        fill={"#FFFFFF"}
        version="1.1"
        id="play_svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 14.4 16.4"
        style={{ enableBackground: "new 0 0 14.4 16.4" }}
        xmlSpace="preserve"
      >
        <path
          id="XMLID_104_"
          d="M0.9,0.3l13,7.5c0.3,0.2,0.3,0.7,0,0.9l-13,7.5c-0.3,0.2-0.8,0-0.8-0.4V0.7C0.2,0.3,0.6,0.1,0.9,0.3z"
        />
      </svg>
    </div>
  );
};

export const Pause = (props) => {
  const size = props.size ? props.size + "px" : "14px";
  let styling = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: size,
    height: size,
  };
  return (
    <div style={styling}>
      <svg
        fill={"#FFFFFF"}
        version="1.1"
        id="pause_svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 14.4 16.4"
        style={{ enableBackground: "new 0 0 14.4 16.4" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_126_">
          <path
            id="XMLID_125_"
            d="M4.5,0.4H1.4c-0.3,0-0.5,0.2-0.5,0.5v14.7c0,0.3,0.2,0.5,0.5,0.5h3.1C4.7,16,5,15.8,5,15.6V0.9C5,0.6,4.7,0.4,4.5,0.4z"
          />
          <path
            id="XMLID_123_"
            d="M13,0.4H9.9c-0.3,0-0.5,0.2-0.5,0.5v14.7c0,0.3,0.2,0.5,0.5,0.5H13c0.3,0,0.5-0.2,0.5-0.5V0.9C13.4,0.6,13.2,0.4,13,0.4z"
          />
        </g>
      </svg>
    </div>
  );
};

export const Muted = ({ sizeStyle }) => {
  const style = sizeStyle
    ? sizeStyle
    : {
        width: "22px",
        height: "22px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      };
  return (
    <div style={style}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 14.4 16.4"
        style={{ enableBackground: "new 0 0 14.4 16.4" }}
        xmlSpace="preserve"
      >
        <style type="text/css">{".st0{fill:#FFFFFF;}"}</style>
        <path
          id="XMLID_68_"
          d="M12.1,12.3c0.7-1,1.2-2.4,1.2-3.9c0-3.1-1.9-5.6-4.3-5.8C8.9,2.6,8.7,2.8,8.7,3v1
                c0,0.2,0.1,0.3,0.3,0.3c1.5,0.2,2.7,2,2.7,4.1c0,1-0.3,2-0.7,2.7l-0.9-0.9c0.3-0.5,0.6-1.1,0.6-1.8c0-1.3-0.7-2.4-1.7-2.6
                C8.7,5.7,8.5,5.9,8.5,6.1v2.5L7.2,7.4V3.9c0-0.2-0.2-0.3-0.4-0.2L5.2,5.3L2.1,2.2c-0.1-0.1-0.4-0.1-0.5,0L1.1,2.6C1,2.8,1,3,1.1,3.2
                l3.1,3.1L4.1,6.4c0,0-0.1,0.1-0.2,0.1H1.3c-0.1,0-0.2,0.1-0.2,0.2v1.7v1.7c0,0.1,0.1,0.2,0.2,0.2H4c0.1,0,0.1,0,0.2,0.1l2.7,2.7
                c0.1,0.1,0.4,0,0.4-0.2V9.2l1.3,1.3v0.2c0,0.2,0.2,0.4,0.4,0.4c0,0,0,0,0.1,0l1.1,1.1c-0.3,0.2-0.7,0.4-1.1,0.4
                c-0.2,0-0.3,0.2-0.3,0.3v1c0,0.2,0.2,0.3,0.3,0.3c0.8-0.1,1.5-0.4,2.2-0.9l0.9,0.9c0.1,0.1,0.4,0.1,0.5,0l0.4-0.4
                c0.1-0.1,0.1-0.4,0-0.5L12.1,12.3z"
        />
      </svg>
    </div>
  );
};

export const MinVolume = () => {
  return (
    <div style={size_style_volume}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 14.4 16.4"
        style={{ enableBackground: "new 0 0 14.4 16.4" }}
        xmlSpace="preserve"
      >
        <style type="text/css">{".st0{fill:#FFFFFF;} .st1{opacity:0;}"}</style>
        <g id="XMLID_128_">
          <path
            id="XMLID_132_"
            d="M3.9,6.3H1.3C1.1,6.3,1,6.4,1,6.5v1.7v1.7c0,0.1,0.1,0.2,0.2,0.2h2.7c0.1,0,0.1,0,0.2,0.1
                        l2.7,2.7c0.1,0.1,0.4,0,0.4-0.2V8.2V3.7c0-0.2-0.2-0.3-0.4-0.2L4.1,6.2C4.1,6.2,4,6.3,3.9,6.3z"
          />
          <path
            id="XMLID_131_"
            d="M8.5,10.5c0,0.2,0.2,0.4,0.4,0.4c1-0.3,1.7-1.3,1.7-2.6S9.9,5.8,8.9,5.6
                        C8.7,5.5,8.5,5.7,8.5,5.9V10.5z"
          />
          <g id="XMLID_129_" className="st1">
            <path
              id="XMLID_130_"
              d="M8.7,13.7v-1c0-0.2,0.1-0.3,0.3-0.3c1.5-0.2,2.7-2,2.7-4.1S10.5,4.3,9,4.1
                            c-0.2,0-0.3-0.2-0.3-0.3v-1c0-0.2,0.2-0.3,0.3-0.3c2.4,0.2,4.3,2.7,4.3,5.8S11.4,13.8,9,14C8.8,14,8.7,13.9,8.7,13.7z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const MaxVolume = () => {
  return (
    <div style={size_style_volume}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 14.4 16.4"
        style={{ enableBackground: "new 0 0 14.4 16.4" }}
        xmlSpace="preserve"
      >
        <style type="text/css">{".st0{fill:#FFFFFF;}"}</style>
        <g id="XMLID_128_">
          <path
            id="XMLID_132_"
            d="M3.9,6.3H1.3C1.1,6.3,1,6.4,1,6.5v1.7v1.7c0,0.1,0.1,0.2,0.2,0.2h2.7c0.1,0,0.1,0,0.2,0.1
                        l2.7,2.7c0.1,0.1,0.4,0,0.4-0.2V8.2V3.7c0-0.2-0.2-0.3-0.4-0.2L4.1,6.2C4.1,6.2,4,6.3,3.9,6.3z"
          />
          <path
            id="XMLID_131_"
            d="M8.5,10.5c0,0.2,0.2,0.4,0.4,0.4c1-0.3,1.7-1.3,1.7-2.6S9.9,5.8,8.9,5.6
                        C8.7,5.5,8.5,5.7,8.5,5.9V10.5z"
          />
          <g id="XMLID_129_">
            <path
              id="XMLID_130_"
              d="M8.7,13.7v-1c0-0.2,0.1-0.3,0.3-0.3c1.5-0.2,2.7-2,2.7-4.1S10.5,4.3,9,4.1
                            c-0.2,0-0.3-0.2-0.3-0.3v-1c0-0.2,0.2-0.3,0.3-0.3c2.4,0.2,4.3,2.7,4.3,5.8S11.4,13.8,9,14C8.8,14,8.7,13.9,8.7,13.7z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const Next = () => {
  return (
    <div style={size_style}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 14.4 16.4"
        style={{ enableBackground: "new 0 0 14.4 16.4" }}
        xmlSpace="preserve"
      >
        <style type="text/css">{".st0{fill:#FFFFFF;}"}</style>
        <path
          id="XMLID_103_"
          d="M1.7,2.3L10,7.9c0.2,0.1,0.2,0.5,0,0.7l-8.3,5.6c-0.2,0.1-0.5,0-0.5-0.3V2.6
                    C1.2,2.3,1.5,2.2,1.7,2.3z"
        />
        <rect id="XMLID_102_" x="11.2" y="2.3" width="2" height="11.9" />
      </svg>
    </div>
  );
};

export const PictureInPicture = () => {
  const size_style = {
    display: "flex",
    width: "20px",
    height: "20px",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={size_style}>
      <svg
        version="1.1"
        id="pipsvg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 22.3 18.1"
        style={{ enableBackground: "new 0 0 22.3 18.1" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_1_">
          <path
            id="XMLID_100_"
            d="M17.3,14.2h-6.6c-0.4,0-0.8-0.3-0.8-0.8V8.8C10,8.4,10.4,8,10.8,8h6.6c0.4,0,0.8,0.3,0.8,0.8
                        v4.6C18.1,13.9,17.8,14.2,17.3,14.2z"
          />
          <g id="XMLID_99_">
            <path
              id="XMLID_120_"
              d="M19.8,18.1H2.5C1.1,18.1,0,17,0,15.6V2.5C0,1.1,1.1,0,2.5,0h17.3c1.4,0,2.5,1.1,2.5,2.5v13.1
                            C22.3,17,21.2,18.1,19.8,18.1z M2.5,2C2.2,2,2,2.2,2,2.5v13.1c0,0.3,0.2,0.5,0.5,0.5h17.3c0.3,0,0.5-0.2,0.5-0.5V2.5
                            c0-0.3-0.2-0.5-0.5-0.5H2.5z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const ClosedCaption = () => {
  const size_style = {
    display: "flex",
    width: "22px",
    height: "22px",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={size_style}>
      <svg
        version="1.1"
        id="cc_svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 22.3 18.1"
        style={{ enableBackground: "new 0 0 22.3 18.1" }}
        xmlSpace="preserve"
      >
        <path
          id="XMLID_179_"
          d="M18.5,2.1H3.8C3,2.1,2.3,2.7,2.3,3.6v11c0,0.8,0.7,1.5,1.5,1.5h14.7c0.8,0,1.5-0.7,1.5-1.5v-11
                    C20,2.7,19.3,2.1,18.5,2.1z M3.6,7.9c0-0.2,0.1-0.3,0.3-0.3h3c0.2,0,0.3,0.1,0.3,0.3v1.4c0,0.2-0.1,0.3-0.3,0.3h-3
                    c-0.2,0-0.3-0.1-0.3-0.3V7.9z M13.8,13.6c0,0.2-0.1,0.3-0.3,0.3H3.9c-0.2,0-0.3-0.1-0.3-0.3v-1.4c0-0.2,0.1-0.3,0.3-0.3h9.7
                    c0.2,0,0.3,0.1,0.3,0.3V13.6z M18.7,13.6c0,0.2-0.1,0.3-0.3,0.3h-3c-0.2,0-0.3-0.1-0.3-0.3v-1.4c0-0.2,0.1-0.3,0.3-0.3h3
                    c0.2,0,0.3,0.1,0.3,0.3V13.6z M18.7,9.3c0,0.2-0.1,0.3-0.3,0.3H8.8c-0.2,0-0.3-0.1-0.3-0.3V7.9c0-0.2,0.1-0.3,0.3-0.3h9.7
                    c0.2,0,0.3,0.1,0.3,0.3V9.3z"
        />
      </svg>
    </div>
  );
};

export const FullScreen = () => {
  const size_style = {
    display: "flex",
    width: "22px",
    height: "22px",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={size_style}>
      <svg
        version="1.1"
        id="fs_svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 22.3 18.1"
        style={{ enableBackground: "new 0 0 22.3 18.1" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_1_">
          <path
            id="XMLID_44_"
            d="M13.3,2.9h4v3.6h2V2.3c0-0.8-0.6-1.4-1.4-1.4h-4.6V2.9z"
          />
          <path
            id="XMLID_43_"
            d="M5,6.5V2.9h4v-2H4.4C3.6,0.9,3,1.5,3,2.3v4.2H5z"
          />
          <path
            id="XMLID_42_"
            d="M17.3,10.8v4.5h-4v2h4.6c0.8,0,1.4-0.6,1.4-1.4v-5H17.3z"
          />
          <path
            id="XMLID_41_"
            d="M9,15.2H5v-4.5H3v5c0,0.8,0.6,1.4,1.4,1.4H9V15.2z"
          />
        </g>
      </svg>
    </div>
  );
};

export const MovieSvg = () => {
  const size_style = {
    display: "flex",
    width: "22px",
    height: "22px",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={size_style}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 22.3 18.1"
        style={{ enableBackground: "new 0 0 22.3 18.1" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_98_">
          <path
            id="XMLID_117_"
            d="M19.5,16.3H2.8c-1,0-1.9-0.8-1.9-1.9V3.7c0-1,0.8-1.9,1.9-1.9h16.7c1,0,1.9,0.8,1.9,1.9v10.7
                        C21.4,15.4,20.5,16.3,19.5,16.3z M3,14.3h16.4V3.9H3V14.3z"
          />
        </g>
      </svg>
    </div>
  );
};

export const Expand = () => {
  const size_style = {
    display: "flex",
    width: "22px",
    height: "22px",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={size_style}>
      <svg
        version="1.1"
        id="expand_svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 22.3 18.1"
        style={{ enableBackground: "new 0 0 22.3 18.1" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_42_">
          <path
            id="XMLID_41_"
            d="M17.2,1.4h-5.9c-0.1,0-0.1,0.1-0.1,0.1v1.2c0,0.1,0.1,0.1,0.1,0.1h5.6C16.9,2.9,17,2.9,17,3
                        v11.4c0,0.1-0.1,0.1-0.1,0.1H5.5c-0.1,0-0.1-0.1-0.1-0.1V8.7c0-0.1-0.1-0.1-0.1-0.1H4c-0.1,0-0.1,0.1-0.1,0.1v6
                        c0,0.7,0.6,1.3,1.3,1.3h12.1c0.7,0,1.3-0.6,1.3-1.3V2.7C18.5,2,17.9,1.4,17.2,1.4z"
          />
          <path
            id="XMLID_1_"
            d="M14.3,10.8L6.8,3.4c-0.1-0.1,0-0.2,0.1-0.2h1.6h1c0.1,0,0.1-0.1,0.1-0.1V2.2
                        C9.7,2.1,9.6,2,9.5,2h-5C4.5,2,4.5,2.1,4.5,2.2v4.8c0,0.1,0.1,0.1,0.1,0.1h0.9c0.1,0,0.1-0.1,0.1-0.1v-1V4.2l7.6,7.6
                        c0,0,0.1,0,0.2,0l0.9-0.9C14.3,10.9,14.3,10.8,14.3,10.8z"
          />
        </g>
      </svg>
    </div>
  );
};

export const Arrow = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_29_">
          <path
            id="XMLID_35_"
            d="M139.8,196.8l-86.1-89.9c-1.9-2-1.9-5.2,0.2-7.2l14.6-14c2-1.9,5.2-1.9,7.2,0.2l63.7,66.5
                        c2,2.1,5.4,2.1,7.4-0.1l60.8-66.1c1.9-2.1,5.1-2.2,7.2-0.3l14.9,13.7c2.1,1.9,2.2,5.1,0.3,7.2l-82.7,90
                        C145.3,198.9,141.9,198.9,139.8,196.8z"
          />
        </g>
      </svg>
    </div>
  );
};

export const Artist = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <path
          id="XMLID_51_"
          d="M221.7,15h-85c-2,0-3.5,1.6-3.5,3.5v130.9c-4.5-1.2-9.4-1.8-14.3-1.8c-33.6,0-60.6,27-60.6,60.6
                    c0,33.4,27,60.4,60.6,60.4c28,0,51.6-19,58.3-45c1.4-4.9,2-10,2-15.3V85.4c0-2,1.6-3.5,3.5-3.5h38.9c2,0,3.5-1.6,3.5-3.5V18.5
                    C225.2,16.6,223.6,15,221.7,15z"
        />
      </svg>
    </div>
  );
};

export const History = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_46_">
          <g id="XMLID_43_">
            <path
              id="XMLID_44_"
              d="M161.2,29.9C99.6,29.9,49.5,80,49.5,141.8h26.4c0-47.1,38.2-85.4,85.3-85.4
                            c47.2,0,85.4,38.4,85.4,85.4s-38.2,85.3-85.4,85.3c-25.5,0-48.5-11.2-64-29.1l-17.3,20.4c20.4,21.7,49.3,35.2,81.3,35.2
                            c61.8,0,111.9-50.1,111.9-111.7C273.1,80,223,29.9,161.2,29.9z"
            />
          </g>
          <polygon id="XMLID_42_" points="114,141.7 62.2,209.1 10.4,141.7 	" />
          <g id="XMLID_11_">
            <polygon
              id="XMLID_41_"
              points="201.1,197.9 148.1,167.9 148.1,92.4 174.5,92.4 174.5,152.5 214.1,174.9 		"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const Library = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_11_">
          <path
            id="XMLID_44_"
            d="M27.5,66.1h21.3c2.4,0,4.4,2,4.4,4.4v154.2c0,2.4,2,4.4,4.4,4.4h155.8c1.2,0,2.3,1,2.3,2.3
                        v25.9c0,2.4-2,4.4-4.4,4.4H27.5c-2.4,0-4.4-2-4.4-4.4V70.4C23.2,68,25.1,66.1,27.5,66.1z"
          />
          <path
            id="XMLID_41_"
            d="M246.2,21.9H82.1c-6.6,0-11.9,5.3-11.9,11.9v166.2c0,6.6,5.3,11.9,11.9,11.9h164.1
                        c7.8,0,14.1-6.3,14.1-14.1V36C260.3,28.2,254,21.9,246.2,21.9z M207.7,117.2l-63.5,47.5c-1.7,1.3-4.2,0.1-4.2-2.1V67.6
                        c0-2.2,2.5-3.4,4.2-2.1l63.5,47.5C209.1,114,209.1,116.1,207.7,117.2z"
          />
        </g>
      </svg>
    </div>
  );
};

export const Playlist = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_11_">
          <path
            id="XMLID_44_"
            d="M194.9,162.5l75.7,49c1.4,0.9,1.4,2.8,0,3.7l-75.7,49c-1.5,1-3.4-0.1-3.4-1.9v-97.9
                        C191.4,162.7,193.4,161.6,194.9,162.5z"
          />
          <path
            id="XMLID_43_"
            d="M231.3,60.4H12.1c-0.1,0-0.2-0.1-0.2-0.2V19.1c0-0.1,0.1-0.2,0.2-0.2h219.3
                        c0.1,0,0.2,0.1,0.2,0.2v41.1C231.5,60.3,231.4,60.4,231.3,60.4z"
          />
          <path
            id="XMLID_42_"
            d="M231.3,128.3H12.1c-0.1,0-0.2-0.1-0.2-0.2V87c0-0.1,0.1-0.2,0.2-0.2h219.3
                        c0.1,0,0.2,0.1,0.2,0.2v41.1C231.5,128.2,231.4,128.3,231.3,128.3z"
          />
          <path
            id="XMLID_41_"
            d="M171,204.6H12.1c-0.1,0-0.2-0.1-0.2-0.2v-49.6c0-0.1,0.1-0.2,0.2-0.2H171
                        c0.1,0,0.2,0.1,0.2,0.2v49.6C171.2,204.6,171.1,204.6,171,204.6z"
          />
        </g>
      </svg>
    </div>
  );
};

export const Save = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_45_">
          <path
            id="XMLID_58_"
            d="M164.8,80.8H14.6c-0.1,0-0.2-0.1-0.2-0.2V52.5c0-0.1,0.1-0.2,0.2-0.2h150.2
                        c0.1,0,0.2,0.1,0.2,0.2v28.1C165,80.7,164.9,80.8,164.8,80.8z"
          />
          <path
            id="XMLID_57_"
            d="M164.8,127.3H14.6c-0.1,0-0.2-0.1-0.2-0.2V99.1c0-0.1,0.1-0.2,0.2-0.2h150.2
                        c0.1,0,0.2,0.1,0.2,0.2v28.1C165,127.3,164.9,127.3,164.8,127.3z"
          />
          <path
            id="XMLID_56_"
            d="M123.4,179.7H14.6c-0.1,0-0.2-0.1-0.2-0.2v-33.9c0-0.1,0.1-0.2,0.2-0.2h108.9
                        c0.1,0,0.2,0.1,0.2,0.2v33.9C123.6,179.6,123.5,179.7,123.4,179.7z"
          />
          <path
            id="XMLID_52_"
            d="M217.7,152.8v-48.6c0-0.8-0.6-1.4-1.4-1.4h-22.8c-0.8,0-1.4,0.6-1.4,1.4v48.6
                        c0,0.8-0.6,1.4-1.4,1.4h-48.6c-0.8,0-1.4,0.6-1.4,1.4v22.8c0,0.8,0.6,1.4,1.4,1.4h48.6c0.8,0,1.4,0.6,1.4,1.4v48.6
                        c0,0.8,0.6,1.4,1.4,1.4h22.8c0.8,0,1.4-0.6,1.4-1.4v-48.6c0-0.8,0.6-1.4,1.4-1.4h48.6c0.8,0,1.4-0.6,1.4-1.4v-22.8
                        c0-0.8-0.6-1.4-1.4-1.4h-48.6C218.3,154.1,217.7,153.5,217.7,152.8z"
          />
        </g>
      </svg>
    </div>
  );
};

export const Share = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <path
          id="XMLID_59_"
          d="M265.8,135.4l-99.1-99.7V96c0,0-125.5,9.9-148,139.2c0,0-3.9,21.1,4,8.7
                    c7.9-12.4,42.3-63.4,144-67.2v58.6L265.8,135.4z"
        />
      </svg>
    </div>
  );
};

export const Subscriptions = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_11_">
          <path
            id="XMLID_45_"
            d="M233.3,101.1H50.1c-0.2,0-0.3-0.1-0.3-0.3V66.7c0-0.2,0.1-0.3,0.3-0.3h183.2
                        c0.2,0,0.3,0.1,0.3,0.3v34.1C233.6,100.9,233.5,101.1,233.3,101.1z"
          />
          <path
            id="XMLID_44_"
            d="M207.2,58.1h-131c-0.2,0-0.3-0.2-0.3-0.3V37.3c0-0.2,0.2-0.3,0.3-0.3h131
                        c0.2,0,0.3,0.2,0.3,0.3v20.5C207.6,58,207.4,58.1,207.2,58.1z"
          />
          <path
            id="XMLID_41_"
            d="M242.5,110.1H41c-6.4,0-11.6,5.2-11.6,11.6v113.1c0,6.4,5.2,11.6,11.6,11.6h201.5
                        c6.4,0,11.6-5.2,11.6-11.6V121.7C254.1,115.3,248.9,110.1,242.5,110.1z M174.6,179.6l-56.6,30c-1,0.5-2.1-0.2-2.1-1.3v-60
                        c0-1.1,1.2-1.8,2.1-1.3l56.6,30C175.7,177.6,175.7,179,174.6,179.6z"
          />
        </g>
      </svg>
    </div>
  );
};

export const ThumbDown = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_11_">
          <path
            id="XMLID_42_"
            d="M68.9,174.6c-5.8,0.1-11.6,0.1-17.4-0.1c-7.4-0.2-15.3-2.1-20.3-7.6
                        c-8.1-8.9-5.9-21.9-3.9-32.6c4-21.5,13.1-41.3,22.6-60.9C54,64.7,58.4,56,63.8,47.9c2.2-3.4,6.5-11.1,11.4-11.1
                        c12.5,0,100.5,0,100.5,0S195,37.5,195,54.1v105.7c0,0,0,13.2-5.9,19.1c-12.1,12.1-24,24.3-35.9,36.6c-6.1,6.3-12.1,12.6-18.2,18.9
                        c-3.4,3.5-10.2,14.1-16.2,12.2c-5.5-1.8-13.2-12-14.6-17.4c-0.5-1.8-0.1-4.1,0.1-5.9c0.3-3.7,0.7-7.5,1.1-11.2
                        c1-8.8,2.3-17.6,3.8-26.3c0.7-3.7,2.3-7.6,2.7-11.3c-3-0.2-6.2-0.3-9.2-0.3c-3.8,0-7.5,0.1-11.3,0.1
                        C84,174.4,76.4,174.5,68.9,174.6z"
          />
          <path
            id="XMLID_41_"
            d="M214.2,36.8h43.1c0.5,0,0.8,0.4,0.8,0.8v125c0,0.5-0.4,0.8-0.8,0.8h-43.1
                        c-0.5,0-0.8-0.4-0.8-0.8v-125C213.4,37.2,213.8,36.8,214.2,36.8z"
          />
        </g>
      </svg>
    </div>
  );
};

export const ThumbUp = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_11_">
          <path
            id="XMLID_42_"
            d="M214.6,108.9c5.8-0.1,11.6-0.1,17.4,0.1c7.4,0.2,15.3,2.1,20.3,7.6c8.1,8.9,5.9,21.9,3.9,32.6
                        c-4,21.5-13.1,41.3-22.6,60.9c-4.2,8.7-8.6,17.4-13.9,25.4c-2.2,3.4-6.5,11.1-11.4,11.1c-12.5,0-100.5,0-100.5,0
                        s-19.4-0.7-19.4-17.3V123.7c0,0,0-13.2,5.9-19.1c12.1-12.1,24-24.3,35.9-36.6c6.1-6.3,12.1-12.6,18.2-18.9
                        c3.4-3.5,10.2-14.1,16.2-12.2c5.5,1.8,13.2,12,14.6,17.4c0.5,1.8,0.1,4.1-0.1,5.9c-0.3,3.7-0.7,7.5-1.1,11.2
                        c-1,8.8-2.3,17.6-3.8,26.3c-0.7,3.7-2.3,7.6-2.7,11.3c3,0.2,6.2,0.3,9.2,0.3c3.8,0,7.5-0.1,11.3-0.1
                        C199.5,109.1,207,108.9,214.6,108.9z"
          />
          <path
            id="XMLID_41_"
            d="M69.2,246.7H26.2c-0.5,0-0.8-0.4-0.8-0.8v-125c0-0.5,0.4-0.8,0.8-0.8h43.1
                        c0.5,0,0.8,0.4,0.8,0.8v125C70.1,246.3,69.7,246.7,69.2,246.7z"
          />
        </g>
      </svg>
    </div>
  );
};

export const Verified = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <path
          id="XMLID_55_"
          d="M141.7,22.3c-66,0-119.4,53.5-119.4,119.4c0,66,53.5,119.4,119.4,119.4s119.4-53.5,119.4-119.4
                    C261.2,75.8,207.7,22.3,141.7,22.3z M116.8,200.3L57.3,151l15.1-18.2l43.7,36.2l94.2-86l15.9,17.4L116.8,200.3z"
        />
      </svg>
    </div>
  );
};

export const WatchLater = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <path
          id="XMLID_11_"
          d="M141.7,11.4c-72,0-130.4,58.4-130.4,130.4c0,72,58.4,130.4,130.4,130.4s130.4-58.4,130.4-130.4
                    C272.1,69.7,213.7,11.4,141.7,11.4z M190.4,186.3l-59.9-33.8V67.3h29.8v67.8l44.7,25.3L190.4,186.3z"
        />
      </svg>
    </div>
  );
};

export const YourVideos = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_11_">
          <g id="XMLID_42_">
            <path
              id="XMLID_43_"
              d="M255.4,265.1H28c-5.3,0-9.7-4.3-9.7-9.7V28c0-5.3,4.3-9.7,9.7-9.7h227.4
                            c5.3,0,9.7,4.3,9.7,9.7v227.4C265.1,260.8,260.8,265.1,255.4,265.1z M57.1,236.1h169.3c5.3,0,9.7-4.3,9.7-9.7V57.1
                            c0-5.3-4.3-9.7-9.7-9.7H57.1c-5.3,0-9.7,4.3-9.7,9.7v169.3C47.4,231.7,51.7,236.1,57.1,236.1z"
            />
          </g>
          <path
            id="XMLID_41_"
            d="M113.3,96.7l72.9,47.1c1.3,0.8,1.3,2.7,0,3.6l-72.9,47.1c-1.4,0.9-3.3-0.1-3.3-1.8V98.5
                        C110,96.8,111.9,95.8,113.3,96.7z"
          />
        </g>
      </svg>
    </div>
  );
};

export const Home = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <path
          id="XMLID_11_"
          d="M141,35.8L16.8,144.5c-0.8,0.7-0.3,2,0.8,2H55c0.6,0,1.2,0.5,1.2,1.2v99.1
                    c0,0.6,0.5,1.2,1.2,1.2H116c0.6,0,1.2-0.5,1.2-1.2v-76.4c0-0.6,0.5-1.2,1.2-1.2h50.8c0.6,0,1.2,0.5,1.2,1.2v76.4
                    c0,0.6,0.5,1.2,1.2,1.2h58.7c0.6,0,1.2-0.5,1.2-1.2v-99.1c0-0.6,0.5-1.2,1.2-1.2h33.4c1.1,0,1.6-1.3,0.8-2L142.5,35.8
                    C142.1,35.4,141.4,35.4,141,35.8z"
        />
      </svg>
    </div>
  );
};

export const Trending = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <path
          id="XMLID_65_"
          d="M228.6,142.2c-9.8-22-27.4-32-43.7-48.1C174,83.5,164.3,77,162.2,61.8
                    c-1.8-13.2,0.6-33.5,0.6-33.5s0-12.9-9.2-7.1c-16,10.2-31,20-42,36.1c-8.9,13-14.1,28-15.6,43.6c-2,21.6,5.2,42.5,2.4,64.1
                    c-0.4,2.7-1,5.8-3.3,7.4c-3.7,2.6-8.7-0.4-11.7-3.8c-17.7-20.4-2.1-44.5-13.1-65.3c-0.4-0.8-1.2-1.8-2.2-1.6c-0.4,0.1-0.7,0.4-1,0.8
                    c-0.1,0.1-0.2,0.2-0.2,0.3C37.2,148.5,38.9,205,82,241.5c47.5,40.1,130.3,25.2,150.6-37.1C239.3,184,237.3,161.5,228.6,142.2z
                    M152.2,223.8c-6.5,0.9-13.1-1-18.9-3.8c-3-1.5-5.8-3.3-8.5-5.2c-3.2-2.3-8.6-5-4.8-9.3c2.6-3,6.2-4.8,9.6-7
                    c6.7-4.4,10.9-10.2,13-17.9c1.9-7,2.2-14.4,1.1-21.5c-1.1-7.1-3.9-13.5-3.3-20.8c0.5-6,3.8-15.3,10.1-17.6c3.3-1.2,3.4,5.2,3.8,7
                    c1,4.6,4.7,8,7.8,11.2c4,4.1,8.3,7.9,12.2,12.1c6,6.5,13.1,13.4,15.3,22.2C194.6,193.2,171.7,221,152.2,223.8z"
        />
      </svg>
    </div>
  );
};

export const Delete = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_1_">
          <path
            id="XMLID_47_"
            d="M73.6,261.8c-7.9,0-14.2-6.4-14.2-14.2v-163c0-2.4,2-4.4,4.4-4.4h151c2.4,0,4.4,2,4.4,4.4v163
                        c0,7.9-6.4,14.2-14.2,14.2"
          />
          <path
            id="XMLID_174_"
            d="M185.2,34.8v-8.6c0-2.5-2-4.5-4.5-4.5h-77.9c-2.5,0-4.5,2-4.5,4.5v8.6H51.7
                        c-2.4,0-4.3,1.9-4.3,4.3v22.6c0,2.4,1.9,4.3,4.3,4.3h180.1c2.4,0,4.3-1.9,4.3-4.3V39.1c0-2.4-1.9-4.3-4.3-4.3H185.2z"
          />
        </g>
      </svg>
    </div>
  );
};

export const Options = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_1_">
          <circle id="XMLID_2_" cx="39.5" cy="141.7" r="29.2" />
          <circle id="XMLID_4_" cx="141.7" cy="141.7" r="29.2" />
          <circle id="XMLID_5_" cx="244" cy="141.7" r="29.2" />
        </g>
      </svg>
    </div>
  );
};

export const Replay = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        id="Capa_1"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <path
          id="XMLID_172_"
          d="M144.7,54.8V20.5c0-4-4.8-6.1-7.8-3.4L84.1,65.8c-2,1.8-2,5,0,6.8l52.8,48.8
                    c3,2.7,7.8,0.6,7.8-3.4V89.8c43.2,1.8,76.7,42,66.8,87.3c-5.8,26.7-27.4,48.2-54.2,53.9c-46.2,9.8-87.1-25.3-87.1-69.8h-35
                    c0,59.8,49.5,108.2,109.7,106.4c55.2-1.6,101.3-47.4,103.2-102.6C250.3,105.5,203.3,56.4,144.7,54.8z"
        />
      </svg>
    </div>
  );
};

export const CloseButton = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <path
          id="XMLID_175_"
          d="M259,44.8l-20.3-20.3c-1.5-1.5-3.9-1.5-5.3,0l-88.9,88.9c-1.5,1.5-3.9,1.5-5.3,0L50.1,24.5
                    c-1.5-1.5-3.9-1.5-5.3,0L24.5,44.8c-1.5,1.5-1.5,3.9,0,5.3l88.9,88.9c1.5,1.5,1.5,3.9,0,5.3l-88.9,88.9c-1.5,1.5-1.5,3.9,0,5.3
                    L44.8,259c1.5,1.5,3.9,1.5,5.3,0l88.9-88.9c1.5-1.5,3.9-1.5,5.3,0l88.9,88.9c1.5,1.5,3.9,1.5,5.3,0l20.3-20.3c1.5-1.5,1.5-3.9,0-5.3
                    l-88.9-88.9c-1.5-1.5-1.5-3.9,0-5.3L259,50.1C260.5,48.7,260.5,46.3,259,44.8z"
        />
      </svg>
    </div>
  );
};

export const VideoAlert = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_178_">
          <path
            id="XMLID_79_"
            d="M141.7,46c52.8,0,95.8,43,95.8,95.8s-43,95.8-95.8,95.8S46,194.5,46,141.7S88.9,46,141.7,46
                    M141.7,22.5c-65.8,0-119.2,53.4-119.2,119.2c0,65.8,53.4,119.2,119.2,119.2S261,207.6,261,141.7C261,75.9,207.6,22.5,141.7,22.5
                    L141.7,22.5z"
          />
          <rect id="XMLID_176_" x="130.3" y="83.7" width="22.8" height="70" />
          <rect
            id="XMLID_177_"
            x="130.3"
            y="178.2"
            width="22.8"
            height="22.8"
          />
        </g>
      </svg>
    </div>
  );
};

export const Language = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_185_">
          <path
            id="XMLID_188_"
            d="M120.4,38.5V13.8H91.7v24.7H3.2V64h145.7c-7.4,20.5-25.4,46.9-45.1,72
                        c-12.3-15.1-25.1-31.2-34.9-44l-10.1,7.8c5.2,6.8,20.7,26.7,36.9,46.5c-30.2,37.2-61.3,69-61.9,69.6l9.1,8.9
                        c2.3-2.4,31.8-32.4,61.2-68.5c14.6,17.3,28.5,32.5,34.9,36.1l6.2-11.2c-4.8-2.7-17.9-17.3-32.9-35.1c22.2-28.2,42.8-58.7,50.1-82.1
                        h46.7V38.5H120.4z"
          />
          <g id="XMLID_189_">
            <path
              id="XMLID_190_"
              d="M186.6,220.5l-16.2,49.2h-20.9l53.1-156.3H227l53.3,156.3h-21.6L242,220.5H186.6z
                            M237.9,204.8l-15.3-45c-3.5-10.2-5.8-19.5-8.1-28.5H214c-2.3,9.3-4.9,18.8-7.9,28.3l-15.3,45.2H237.9z"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const Logout = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_181_">
          <path
            id="XMLID_183_"
            d="M202.9,141.7l-18-18l0,0l-51.3-51.3c-0.7-0.7-1.9-0.7-2.7,0l-15.3,15.3
                        c-0.7,0.7-0.7,1.9,0,2.7l35.5,35.5c1.2,1.2,0.3,3.2-1.3,3.2H17.1c-1,0-1.9,0.8-1.9,1.9v22.3c0,1,0.8,1.9,1.9,1.9h131.8
                        c1.7,0,2.5,2,1.3,3.2l-34.6,34.6c-0.7,0.7-0.7,1.9,0,2.7l15.3,15.3c0.7,0.7,1.9,0.7,2.7,0l51.3-51.3l0,0l4.5-4.5h0.1v-0.1
                        L202.9,141.7L202.9,141.7L202.9,141.7z"
          />
          <path
            id="XMLID_192_"
            d="M262.8,15.2H20.7c-3,0-5.5,2.5-5.5,5.5V94h28.7V49.3c0-3,2.5-5.5,5.5-5.5h184.8
                        c3,0,5.5,2.5,5.5,5.5v184.8c0,3.1-2.5,5.5-5.5,5.5H49.3c-3,0-5.5-2.5-5.5-5.5v-54.2H15.2v82.8c0,3.1,2.5,5.5,5.5,5.5h242.1
                        c3,0,5.5-2.5,5.5-5.5V20.7C268.3,17.6,265.8,15.2,262.8,15.2z"
          />
        </g>
      </svg>
    </div>
  );
};

export const Appareance = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <path
          id="XMLID_187_"
          d="M278.7,137.8L243,102.1c-1.1-1.1-1.6-2.5-1.6-4V47.7c0-3.1-2.5-5.6-5.6-5.6h-50.4
                    c-1.5,0-2.9-0.6-4-1.6L145.7,4.8c-2.2-2.2-5.7-2.2-7.9,0l-35.6,35.6c-1.1,1.1-2.5,1.6-4,1.6H47.7c-3.1,0-5.6,2.5-5.6,5.6v50.4
                    c0,1.5-0.6,2.9-1.6,4L4.8,137.8c-2.2,2.2-2.2,5.7,0,7.9l35.6,35.7c1.1,1.1,1.6,2.5,1.6,4v50.4c0,3.1,2.5,5.6,5.6,5.6h50.4
                    c1.5,0,2.9,0.6,4,1.6l35.6,35.7c2.2,2.2,5.7,2.2,7.9,0l35.6-35.7c1.1-1.1,2.5-1.6,4-1.6h50.4c3.1,0,5.6-2.5,5.6-5.6v-50.4
                    c0-1.5,0.6-2.9,1.6-4l35.6-35.7C280.8,143.5,280.8,140,278.7,137.8z M123.1,216.5c-13.6,0-26.4-3.7-37.4-10.1
                    c22.3-12.9,37.4-37,37.4-64.6S108,90,85.7,77.1c14.4-8.3,31.7-12.1,50.1-9c32.3,5.4,57.9,32.6,61.5,65.2
                    C202.2,178.3,167.1,216.5,123.1,216.5z"
        />
      </svg>
    </div>
  );
};

export const Upload = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <path
          id="XMLID_617_"
          d="M212.2,97.7V53.8H8v175.9h204.2v-43.9l63.3,36.6V61.1L212.2,97.7z M171.3,155.2h-45.5v45.5
                    H98.7v-45.5H53.2v-27.1h45.5V82.7h27.1v45.5h45.5V155.2z"
        />
      </svg>
    </div>
  );
};

export const Grid = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_642_">
          <rect id="XMLID_613_" x="22.5" y="21.9" width="54.8" height="54.8" />
          <rect id="XMLID_618_" x="114.3" y="21.9" width="54.8" height="54.8" />
          <rect id="XMLID_619_" x="206.1" y="21.9" width="54.8" height="54.8" />
          <rect id="XMLID_621_" x="22.5" y="114.3" width="54.8" height="54.8" />
          <rect
            id="XMLID_620_"
            x="114.3"
            y="114.3"
            width="54.8"
            height="54.8"
          />
          <rect
            id="XMLID_614_"
            x="206.1"
            y="114.3"
            width="54.8"
            height="54.8"
          />
          <rect id="XMLID_639_" x="22.5" y="206.7" width="54.8" height="54.8" />
          <rect
            id="XMLID_638_"
            x="114.3"
            y="206.7"
            width="54.8"
            height="54.8"
          />
          <rect
            id="XMLID_627_"
            x="206.1"
            y="206.7"
            width="54.8"
            height="54.8"
          />
        </g>
      </svg>
    </div>
  );
};

export const Bell = ({ iconStyle, className }) => {
  return (
    <div className={className}>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 283.5 283.5"
        style={{ enableBackground: "new 0 0 283.5 283.5" }}
        xmlSpace="preserve"
      >
        <g id="XMLID_611_">
          <path
            id="XMLID_641_"
            d="M165.2,238.2h-47c-1.6,0-3,1.4-2.8,3c1.5,13.2,12.7,23.5,26.3,23.5s24.8-10.3,26.3-23.5
                        C168.2,239.6,166.8,238.2,165.2,238.2z"
          />
          <path
            id="XMLID_645_"
            d="M238.7,199.1l-25.4-43.9v-35.3c0-31-20.5-57.1-48.6-65.8V40c0-11.8-9.5-21.3-21.3-21.3H140
                        c-11.8,0-21.3,9.5-21.3,21.3v14c-28.1,8.6-48.6,34.8-48.6,65.8v35.3l-25.4,43.9c-8.1,14,2,31.5,18.2,31.5h157.5
                        C236.7,230.6,246.8,213.1,238.7,199.1z"
          />
        </g>
      </svg>
    </div>
  );
};
