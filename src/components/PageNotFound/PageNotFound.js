import React from "react";
import "./PageNotFound.css";
import { Helmet } from "react-helmet";

function PageNotFound() {
  return (
    <div className="main_div">
    <Helmet title="Oops!! Page not found" />
      <section class="page_404">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 ">
              <div class="col-sm-10 col-sm-offset-1  text-center">
                <div class="four_zero_four_bg">
                  <h1 class="text-center ">404</h1>
                </div>
                <div class="contant_box_404">
                  <h3 class="h2">Looks like you're lost</h3>
                  <p>The page you are trying to visit is not avaible!</p>
                  <a href="/" class="link_404">
                    Go to Home
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PageNotFound;
