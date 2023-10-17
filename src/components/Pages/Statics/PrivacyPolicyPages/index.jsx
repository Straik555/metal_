import React from 'react';
import L from 'i18n-react';

const PrivacyPolicyPages = () => {
  const translatePath = 'Statics.PrivacyPolicyPages';
  const treatmentPath = `${translatePath}.TheOwnerOfTheTreatment`;
  const dataPlacePath = `${translatePath}.PlaceOfDataProcessing`;
  const dataPurposePath = `${translatePath}.PurposeOfDataProcessing`;
  const dataTypesPath = `${translatePath}.TypesOfDataProcessed`;
  const cookiesPath = `${translatePath}.Cookies`;
  const dataProvisionPath = `${translatePath}.OptionalProvisionOfData`;
  const methodTreatmentPath = `${translatePath}.MethodOfTreatment`;
  const rightsPath = `${translatePath}.RightsOfTheInterestedParties`;

  return (
    <section className="page-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <p className="section-title">
              {L.translate(`${translatePath}.title`)}
            </p>

            <div className="terms-content">
              <div className="terms-block">
                <p>
                  {L.translate(`${translatePath}.p_01`, {
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
                <p>
                  {L.translate(`${translatePath}.p_02`, {
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
                <p>{L.translate(`${translatePath}.p_03`)}</p>
              </div>

              <div className="terms-block">
                <p>{L.translate(`${translatePath}.p_04`)}</p>
                <ul className="terms-list-item-desc">
                  <li>{L.translate(`${translatePath}.p_04_note_1`)}</li>
                  <li>{L.translate(`${translatePath}.p_04_note_2`)}</li>
                </ul>
              </div>

              <div className="terms-block">
                <p>{L.translate(`${translatePath}.p_05`)}</p>
              </div>

              <div className="terms-block">
                <p>{L.translate(`${translatePath}.p_06`)}</p>
              </div>

              <ol className="terms-list privacy-policy-list">
                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${treatmentPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${treatmentPath}.p_01`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${dataPlacePath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${dataPlacePath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${dataPlacePath}.p_02`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${dataPlacePath}.p_03`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${dataPurposePath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${dataPurposePath}.p_01`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${dataTypesPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${dataTypesPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${dataTypesPath}.p_02`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${dataTypesPath}.p_03`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${dataTypesPath}.p_04`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${dataTypesPath}.p_05`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${dataTypesPath}.p_06`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${dataTypesPath}.p_07`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${cookiesPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${cookiesPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${cookiesPath}.p_02`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${cookiesPath}.p_03`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>{L.translate(`${cookiesPath}.p_04`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${dataProvisionPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${dataProvisionPath}.p_01`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>
                      {L.translate(`${methodTreatmentPath}.block_heading`)}
                    </h2>
                    <div className="terms-block">
                      <p>{L.translate(`${methodTreatmentPath}.p_01`)}</p>
                    </div>
                  </li>
                </div>

                <div className="list-item-wrapper">
                  <li className="terms-list-item">
                    <h2>{L.translate(`${rightsPath}.block_heading`)}</h2>
                    <div className="terms-block">
                      <p>{L.translate(`${rightsPath}.p_01`)}</p>
                    </div>
                    <div className="terms-block">
                      <p>
                        {L.translate(`${rightsPath}.p_02`, {
                          email: (
                            <a
                              href="mailto: info@metaltradingcompany.com"
                              target="blank"
                            >
                              info@metaltradingcompany.com
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

export default PrivacyPolicyPages;
