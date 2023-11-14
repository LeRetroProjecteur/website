"use client";

import classNames from "classnames";
import { ChangeEvent, useCallback, useState } from "react";

import "./mailchimp.css";

function isValidEmail(email: string) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}

export default function Newsletter() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  const onBlurEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length === 0) {
        setErrorMessage("Ce champs est requis.");
      } else if (!isValidEmail(e.target.value)) {
        setErrorMessage("Veuillez entrer une adresse email valide.");
      } else {
        setErrorMessage(undefined);
      }
    },
    [setErrorMessage],
  );

  return (
    <>
      <div id="header"></div>
      <h2>
        Abonnez-vous à notre newsletter hebdomadaire «&nbsp;Up Close&nbsp;»
      </h2>
      <div style={{ textAlign: "center" }}>
        <div id="mc_embed_shell">
          <div id="mc_embed_signup" style={{ margin: "0 auto" }}>
            <form
              action="https://leretroprojecteur.us6.list-manage.com/subscribe/post?u=00a9245e71d3375ef4542a588&amp;id=3270cdb251&amp;f_id=00e804e3f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="validate"
              target="_blank"
            >
              <div id="mc_embed_signup_scroll">
                <div className="indicates-required">
                  <span className="asterisk" style={{ color: "var(--red)" }}>
                    *
                  </span>{" "}
                  champs obligatoires
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-EMAIL">
                    Email{" "}
                    <span className="asterisk" style={{ color: "var(--red)" }}>
                      *
                    </span>
                  </label>
                  <input
                    type="email"
                    name="EMAIL"
                    className={classNames("required email", {
                      mce_inline_error: errorMessage != null,
                    })}
                    id="mce-EMAIL"
                    required={true}
                    onBlur={onBlurEmail}
                  />
                  {errorMessage != null ? (
                    <div className="mce_inline_error">{errorMessage}</div>
                  ) : null}
                </div>
                <div className="mc-field-group">
                  <label htmlFor="mce-MMERGE1">
                    Comment nous connaissez-vous&nbsp;? (facultatif){" "}
                  </label>
                  <input
                    type="text"
                    name="MMERGE1"
                    className=" text"
                    id="mce-MMERGE1"
                    value=""
                  />
                </div>
                <div id="mce-responses" className="clear">
                  <div
                    className="response"
                    id="mce-error-response"
                    style={{ display: "none", color: "var(--red)" }}
                  ></div>
                  <div
                    className="response"
                    id="mce-success-response"
                    style={{ display: "none", color: "var(--red)" }}
                  ></div>
                </div>
                <div className="clear">
                  <input
                    disabled={errorMessage != null}
                    type="submit"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    className="button"
                    value="S'abonner"
                    style={{ backgroundColor: "var(--red)" }}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
