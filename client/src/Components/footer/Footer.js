import { Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";

export const Footer = ()=>{
return(
<Container fluid>
<div class="footer-dark font-link">
  <footer>
      <div class="container" style={{width:"100% !important",margin:"0px !important"}}>
          <div class="row">
              <div class="col-sm-6 col-md-3 item">
                  <h3>Services</h3>
                  <ul>
                      <li><a href="#">Project Management</a></li>
                  </ul>
              </div>
              <div class="col-sm-6 col-md-3 item">
                  <h3>About</h3>
                  <ul>
                      <li>                <LinkContainer to='/About'>
                                    <a href="#">Procuratio</a>
                                </LinkContainer></li>
                  </ul>
              </div>
              <div class="col-md-6 item text">
                  <h3>Procuratio</h3>
                  <p>Providing web based project management solutions since 2022.</p>
              </div>
          </div>
          <p class="copyright">Procuratio © 2023</p>
      </div>
  </footer>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/js/bootstrap.bundle.min.js"></script>
</Container>
    )
};