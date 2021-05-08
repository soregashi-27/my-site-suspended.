import React, { useEffect, useRef } from "react"
import styled from "styled-components"

const StyledContactSection = styled.section`
  max-width: 600px;
  margin:0 auto 100px;
  text-align: center;

  @media (max-width: 768px) {
      margin: 0 auto 50px;
  }

.overline {
    display: block;
    margin-botton: 20px;
    color:var(--green);
    font-family: var(--font--mono);
    font-size: var(--fz-md);
    font-weight: 400;

    &:before{
        bottom: 0;
        font-size var(--fz-sm);
    }

    &:after{
        display: none;
    }

    .title {
        font-size: clamp(40px, 5vw, 60px);
    }

    .email-link {
        margin-top: 50px;
    }
}
`

const Contact = () => {
  return (
    <StyledContactSection>
      <h2 className="overline">What's next?</h2>
      <h2 className="title">Get In Touch!</h2>
      <p>
        add text. add text. add text. add text. add text. add text. add text.
        add text.
      </p>

      <a className="email-link" href="">
        Say hi there.
      </a>
    </StyledContactSection>
  )
}

export default Contact
