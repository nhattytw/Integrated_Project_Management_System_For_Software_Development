import { Container, Col, Row, Button } from "react-bootstrap";
import { NavBar } from "../../Components/nav/nav";
import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="font-link">
      <NavBar />
      <Container>
        <Row>
          <Col>
            <h1 className="hhh1">Terms and Conditions</h1>
          </Col>
        </Row>
        <Row>
          <p>
            This document constitutes an employment agreement between these two
            parties and is governed by the laws of the Federal Government of
            Ethiopia. WHEREAS the Employer desires to retain the services of the
            Employee, and the Employee desires to render such services, these
            terms and conditions are set forth. IN CONSIDERATION of this mutual
            understanding, the parties agree to the following terms and
            conditions{"      "}
          </p>

          <h4>Employment</h4>
          <p>
            The Employee agrees that he or she will faithfully and to the best
            of their ability to carry out the duties and responsibilities
            communicated to them by the Employer. The Employee shall comply with
            all company policies, rules and procedures at all times.
          </p>

          <h4>Position</h4>
          <p>
            As a staff member, it is the duty of the Employee to perform all
            essential job functions and duties. From time to time, the Employer
            may also add other duties within the reasonable scope of the
            Employee’s work.
          </p>

          <h4>Probationary Period</h4>
          <p>
            It is understood that the first [45 Days] of employment constitutes
            a probationary period. During this time, the Employee is not
            eligible for paid time off or other benefits. During this time, the
            Employer also exercises the right to terminate employment at any
            time without advance notice.
          </p>

          <p>
            <h4>Intellectual Property</h4>
            All content published and made available on our Site is a property
            of Procuratio and the Site's creators. This includes, but is not
            limited to images, text, logos, documents, downloadable files and
            anything that contributed to the composition of our Site.
            <h4>Acceptable Use</h4>
            As a user of our Site, you agree to use our Site legally, not to use
            our Site for illegal purposes. and not to:
            <ul>
              <li>
                Violate the intellectual property rights of the Site owners or
                any third party to the Site: or
              </li>
              <li>Act in any way that could be considerd fraudulent</li>
            </ul>
            If we believe you are using or Site Illegaly or in a manner that
            violates these Terms and Conditions, we reserve the right to limit,
            suspend or terminate yout access to our Site. We also reserve the
            right to take any legal steps neccessary to prevent you from
            accessing our Site.
            <h4>Termination</h4>
            <p>
              It is the intention of both parties to form a long and mutually
              profitable relationship. However, this relationship may be
              terminated by either party at any time without any further notice.
            </p>
            <h4>Non-Competition and Confidentiality</h4>
            <p>
              As an Employee, you will have access to confidential information
              that is the property of the Employer. You are not permitted to
              disclose this information outside of the Company. During your time
              of Employment with the Employer, you may not engage in any work
              for another Employer that is related to or in competition with the
              Company. You will fully disclose to your Employer any other
              Employment relationships that you have and you will be permitted
              to seek other employment provided that
              <ul>
                <li>
                  It does not detract from your ability to fulfill your duties,
                  and
                </li>
                <li>
                  You are not assisting another organization in competing with
                  the employer.
                </li>
              </ul>
              It is further acknowledged that upon termination of your
              employment, you will not solicit business from any of the
              Employer’s clients for a period of at least [9 Months].
            </p>
            <h4>Accounts</h4>
            When you create an account on our Site, you agree to the following:
            <ol>
              <li>
                You are solely responsible for your account and the security and
                privacy of your account, including passwords or sensitive
                inforation attached to that account; and
              </li>
              <li>
                All personal information you provide to us through your account
                is up to date, accurate, and truthful and that you will update
                your personal information if it changes.
              </li>
            </ol>
            We reserve the right to suspend or terminate your account if you are
            using our Site illegaly or if you violate these Terms and
            Conditions.
            <h4>Limatation of Liability</h4>
            Procuratio and our directors, officers, agents, employees,
            subsidiaries, and affiliates will not be liable for any actions,
            claims, losses, damages, liabilities and expenses including legal
            fees from your use of the Site.
            <h4>Indemnity</h4>
            Except where prohibited by law, by using this Site you indemnify and
            holde harmless Procuratio and our directors, officers, agents,
            employees, subsidiaries, and affiliates from any actions, claims,
            losses, damages, liabilities and expenses including legal fees
            arising out of your use of our Site or your violation of these Terms
            and Conditions.
            <h4>Entirety</h4>
            <p>
              This contract represents the entire agreement between the two
              parties and supersedes any previous written or oral agreement.
              This agreement may be modified at any time, and only works for
              3-months, provided the written consent of both the Employer and
              the Employee.
            </p>
            <h4>Legal Authorization</h4>
            <p>
              The Employee agrees that he or she is fully authorized to work in
              Ethiopia and can provide proof of this with legal documentation.
              This documentation will be obtained by the Employer for legal
              records.
            </p>
            <h4>Severability</h4>
            <p>
              The parties agree that if any portion of this contract is found to
              be void or unenforceable, it shall be struck from the record and
              the remaining provisions will retain their full force and effect.
            </p>
            <h4>Jurisdiction</h4>
            <p>
              This contract shall be governed, interpreted, and construed in
              accordance with the laws of the Federal Government of Ethiopia. In
              witness and agreement whereof, the Employer has executed this
              contract with due process through the authorization of official
              company agents and with the consent of the Employee, given here in
              writing.
            </p>
          </p>
        </Row>
        <Button
          variant="dark"
          style={{ margin: "0px 8px 0px 0px", float: "right" }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Container>
    </div>
  );
}
