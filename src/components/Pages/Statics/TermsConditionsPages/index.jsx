import React from 'react';
import L from 'i18n-react';
import { ComissionsBlock } from './ComissionsBlock';

const TermsConditionsPages = () => {
  const translatePath = 'Statics.TermsConditionsPages';
  const generalInformationPath = `${translatePath}.GeneralInformation`;
  const introductionPath = `${translatePath}.Introduction`;
  const serviceOfferedPath = `${translatePath}.ServiceOffered`;
  const warningsPath = `${translatePath}.Warnings`;
  const accessPlatformPath = `${translatePath}.AccessAndUseOfTheTradingPlatform`;
  const intellectualPath = `${translatePath}.IntellectualPropertyRights`;
  const protectionDataPath = `${translatePath}.ProtectionOfPersonalDataOnTheSite`;
  const userIdentityPath = `${translatePath}.UserIdentityVerification`;
  const verifyTransfersPath = `${translatePath}.VerificationOfTheSourceOfTransfersInTheAccount`;
  const registrationPath = `${translatePath}.RegistrationOfTheUserAccount`;
  const changesAccountPath = `${translatePath}.ChangesToTheMainBankAccount`;
  const protectionPath = `${translatePath}.ProtectionOfPreciousMetals`;
  const taxationPath = `${translatePath}.Taxation`;
  const limitationPath = `${translatePath}.LimitationOfLiabilityAndForceMajeure`;
  const launderingPath = `${translatePath}.MoneyLaundering`;
  const withdrawalPath = `${translatePath}.Withdrawal`;
  const applicablelPath = `${translatePath}.ApplicableLawAndJurisdiction`;
  const miscellaneousPath = `${translatePath}.Miscellaneous`;
  const сommunicationsPath = `${translatePath}.CommunicationsAndComplaints`;

  return (
    <section className="page-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <p className="section-title">
              {L.translate(`${translatePath}.title`)}
            </p>
            <div className="terms-content">
              <ol className="terms-list">
                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>
                      {L.translate(`${generalInformationPath}.block_heading`)}
                    </h2>
                    <div className="terms-block">
                      <p>{L.translate(`${generalInformationPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${generalInformationPath}.p_02`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${introductionPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>
                        {L.translate(`${introductionPath}.p_01`, {
                          link: (
                            <a
                              href="https://www.metaltradingcompany.com/"
                              target="blank"
                            >
                              www.metaltradingcompany.com
                            </a>
                          ),
                        })}
                      </p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${introductionPath}.p_02`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${introductionPath}.p_03`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${introductionPath}.p_04`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${introductionPath}.p_05`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>
                        {L.translate(`${introductionPath}.p_06`, {
                          link: (
                            <a
                              href="https://www.metaltradingcompany.com/"
                              target="blank"
                            >
                              www.metaltradingcompany.com
                            </a>
                          ),
                        })}
                      </p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${introductionPath}.p_07`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${introductionPath}.p_08`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${introductionPath}.p_09`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>
                      {L.translate(`${serviceOfferedPath}.block_heading`)}
                    </h2>
                    <div className="terms-block">
                      <p>{L.translate(`${serviceOfferedPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${serviceOfferedPath}.p_02`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${serviceOfferedPath}.p_03`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${serviceOfferedPath}.p_04`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${serviceOfferedPath}.p_05`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${warningsPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${warningsPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${warningsPath}.p_02`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${warningsPath}.p_03`)}</p>
                    </div>
                  </li>
                </div>

                <ComissionsBlock />

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>
                      {L.translate(`${accessPlatformPath}.block_heading`)}
                    </h2>
                    <div className="terms-block">
                      <p>{L.translate(`${accessPlatformPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${accessPlatformPath}.p_02`)}</p>
                      <ul className="terms-list-item-desc">
                        <li>
                          {L.translate(`${accessPlatformPath}.p_02_note_1`)}
                        </li>
                        <li>
                          {L.translate(`${accessPlatformPath}.p_02_note_2`)}
                        </li>
                      </ul>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${accessPlatformPath}.p_03`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${accessPlatformPath}.p_04`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${accessPlatformPath}.p_05`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${accessPlatformPath}.p_06`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${accessPlatformPath}.p_07`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${accessPlatformPath}.p_08`)}</p>
                      <ul className="terms-list-item-desc">
                        <li>
                          {L.translate(`${accessPlatformPath}.p_08_note_1`)}
                        </li>
                        <li>
                          {L.translate(`${accessPlatformPath}.p_08_note_2`)}
                        </li>
                      </ul>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${intellectualPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${intellectualPath}.p_01`)}</p>
                      <p>{L.translate(`${intellectualPath}.p_02`)}</p>
                      <ul className="terms-list-item-desc">
                        <li>
                          {L.translate(`${intellectualPath}.p_02_note_1`)}
                        </li>
                        <li>
                          {L.translate(`${intellectualPath}.p_02_note_2`)}
                        </li>
                        <li>
                          {L.translate(`${intellectualPath}.p_02_note_3`)}
                        </li>
                      </ul>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>
                      {L.translate(`${protectionDataPath}.block_heading`)}
                    </h2>
                    <div className="terms-block">
                      <p>{L.translate(`${protectionDataPath}.p_01`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${userIdentityPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${userIdentityPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${userIdentityPath}.p_02`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${userIdentityPath}.p_03`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${userIdentityPath}.p_04`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>
                      {L.translate(`${verifyTransfersPath}.block_heading`)}
                    </h2>
                    <div className="terms-block">
                      <p>{L.translate(`${verifyTransfersPath}.p_01`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${registrationPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${registrationPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${registrationPath}.p_02`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${registrationPath}.p_03`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${registrationPath}.p_04`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>
                      {L.translate(`${changesAccountPath}.block_heading`)}
                    </h2>
                    <div className="terms-block">
                      <p>{L.translate(`${changesAccountPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${changesAccountPath}.p_02`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${changesAccountPath}.p_03`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${changesAccountPath}.p_04`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${protectionPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${protectionPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p style={{ textDecoration: 'underline' }}>
                        {L.translate(`${protectionPath}.p_02`)}
                      </p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${protectionPath}.p_03`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${protectionPath}.p_04`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${protectionPath}.p_05`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${protectionPath}.p_06`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${protectionPath}.p_07`)}</p>
                      <ul className="terms-list-item-desc">
                        <li>{L.translate(`${protectionPath}.p_07_note_1`)}</li>
                      </ul>
                      <p>{L.translate(`${protectionPath}.p_08`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${protectionPath}.p_09`)}</p>
                      <ul className="terms-list-item-desc">
                        <li>{L.translate(`${protectionPath}.p_09_note_1`)}</li>
                        <li>{L.translate(`${protectionPath}.p_09_note_2`)}</li>
                        <li>{L.translate(`${protectionPath}.p_09_note_3`)}</li>
                      </ul>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${protectionPath}.p_10`)}</p>
                      <ul className="terms-list-item-desc">
                        <li>{L.translate(`${protectionPath}.p_10_note_1`)}</li>
                        <li>{L.translate(`${protectionPath}.p_10_note_2`)}</li>
                      </ul>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${protectionPath}.p_11`)}</p>
                      <ul className="terms-list-item-desc">
                        <li>{L.translate(`${protectionPath}.p_11_note_1`)}</li>
                        <li>{L.translate(`${protectionPath}.p_11_note_2`)}</li>
                      </ul>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${protectionPath}.p_12`)}</p>
                      <ul className="terms-list-item-desc">
                        <li>{L.translate(`${protectionPath}.p_12_note_1`)}</li>
                        <li>{L.translate(`${protectionPath}.p_12_note_2`)}</li>
                        <li>{L.translate(`${protectionPath}.p_12_note_3`)}</li>
                        <li>{L.translate(`${protectionPath}.p_12_note_4`)}</li>
                      </ul>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${taxationPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${taxationPath}.p_01`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${limitationPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${limitationPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${limitationPath}.p_02`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${limitationPath}.p_03`)}</p>
                      <ul className="terms-list-item-desc">
                        <li>{L.translate(`${limitationPath}.p_03_note_1`)}</li>
                        <li>{L.translate(`${limitationPath}.p_03_note_2`)}</li>
                        <li>{L.translate(`${limitationPath}.p_03_note_3`)}</li>
                      </ul>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${limitationPath}.p_04`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${limitationPath}.p_05`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${limitationPath}.p_06`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${launderingPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${launderingPath}.p_01`)}</p>
                      <ul className="terms-list-item-desc">
                        <li>{L.translate(`${launderingPath}.p_01_note_1`)}</li>
                        <li>{L.translate(`${launderingPath}.p_01_note_2`)}</li>
                        <li>{L.translate(`${launderingPath}.p_01_note_3`)}</li>
                      </ul>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${launderingPath}.p_02`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${launderingPath}.p_03`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${withdrawalPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${withdrawalPath}.p_01`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${applicablelPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${applicablelPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${applicablelPath}.p_02`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${applicablelPath}.p_03`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${applicablelPath}.p_04`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${miscellaneousPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${miscellaneousPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${miscellaneousPath}.p_02`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>
                      {L.translate(`${сommunicationsPath}.block_heading`)}
                    </h2>
                    <div className="terms-block">
                      <p>
                        {L.translate(`${сommunicationsPath}.p_01`, {
                          link: (
                            <a
                              href="mailto: complaints@metaltradingcompany.com"
                              target="blank"
                            >
                              complaints@metaltradingcompany.com
                            </a>
                          ),
                        })}
                      </p>
                    </div>
                  </li>
                </div>
              </ol>
            </div>
            <p className="terms-revision-date">
              {L.translate(`${translatePath}.last_revision_date`)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsConditionsPages;
