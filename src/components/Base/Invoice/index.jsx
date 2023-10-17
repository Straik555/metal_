import html2pdf from 'html2pdf.js';
import L from 'i18n-react';
import { checkType, toCrop } from '../../../services/helpers';

const initdata = {
  id: 'id',
  amount: 'amount',
  subtotal: 'subtotal',
  fee: 'fee',
  user_id: 'user_id',
  created_at: 'created_at',
  bank_name: 'bank_name',
  holder_name: 'holder_name',
  bsb: 'bsb',
  account_number: 'account_number',
};

const inituserdata = {
  user_id: 'user_id',
  created_at: 'created_at',
  first_name: 'first_name',
  last_name: 'last_name',
  phone: 'phone',
  post_code: 'post_code',
  country: 'country',
  state: 'state',
  city: 'city',
  street: 'street',
};

const options = {
  margin: 0,
  filename: 'invoice.pdf',
  image: { type: 'jpeg', quality: 1 },
  jsPDF: {
    unit: 'mm',
    format: 'a4',
    orientation: 'portrait',
  },
};

const invoice = ({ data = initdata, userData = inituserdata }) => {
  return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${L.translate('Invoice.invoice')}</title>
        <style>
            .yesh_invoice {
                width: 620px;
                height: 877px;
                margin: 0 auto;
                font-family: 'Roboto', sans-serif;
                font-size: 14px;
    
            }
    
            .yesh_header {
                background: #121418;
                padding: 15px;
            }
    
            .yesh_logo {
                width: 200px;
            }
    
            .yesh_main {
                padding: 10px;
            }
    
            .yesh_title {
                padding: 30px 15px;
                border-bottom: 1px solid #cfd0d2;
                font-size: 32px;
                text-align: center;
                margin: 0 0 30px 0;
            }
    
            .yesh_section {
                margin-top: 20px;
            }
    
            .yesh_block {
                padding: 0 20px;
            }
    
            .yesh_label {
                margin: 0;
                color: #6e7c8e;
                font-size: 14px;
                text-transform: uppercase;
                font-weight: 500;
                letter-spacing: 0.1em;
            }
    
            .yesh_label_billed {
                margin: 0;
                color: #6e7c8e;
                font-size: 12px;
                font-weight: 500;
                letter-spacing: 0.1em;
            }
    
            .yesh_value {
                color: #000000;
                font-weight: 500;
            }
    
            .yesh_value_billed {
                margin: 0;
                color: #000000;
                font-size: 12px;
                font-weight: 500;
                letter-spacing: 0.1em;
            }
    
            .yesh_subtotal_label {
                margin: 0;
                color: #6e7c8e;
                font-size: 14px;
                font-weight: 500;
                letter-spacing: 0.1em;
            }
    
            .yesh_total_wrap {
                margin: 10px;
                background: #f2f3f4;
                border: 1px solid #dadada;
            }
    
            .yesh_total_row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                border-bottom: 1px solid #dadada;
    
            }
    
            .yesh_total_left {
                display: flex;
                justify-content: flex-end;
                align-items: center;
                padding: 10px;
                border-bottom: 1px solid #dadada;
    
            }
    
            .yesh_value_left {
                width: 20%;
                text-align: right;
            }
    
            .yesh_main_total {
                background: #dadada;
            }
        </style>
    </head>
    
    <body>
        <section class="yesh_invoice">
            <header class="yesh_header">
                <div class="yesh_logo">
                    <img src="/img/logo_black.svg" alt="" />
                </div>
            </header>
            <main class="yesh_main">
                <div class="yesh_title">${L.translate('Invoice.invoice')}</div>
                <div class="yesh_section">
                    <div class="yesh_label">
                        ${L.translate(
                          'Invoice.invoice_number',
                        )} <b class="yesh_value">${data.id || 0}</b>
                    </div>
                    <div class="yesh_label">
                        ${L.translate(
                          'Invoice.date_issue',
                        )} <b class="yesh_value">${data.created_at || 0}</b>
                    </div>
                </div>
                <div class="yesh_section">
                    <div class="yesh_label">
                        ${L.translate(
                          'Invoice.bank_details',
                        )} <b class="yesh_value">${data.bank_name || 0}</b>
                    </div>
                    <div class="yesh_label">
                        ${L.translate('Invoice.account_holder')}
                        <b class="yesh_value">${data.holder_name || 0}</b>
                    </div>
                    <div class="yesh_label">
                        ${L.translate(
                          'Invoice.bank_state_branch',
                        )} <b class="yesh_value">${data.bsb || 0}</b>
                    </div>
                    <div class="yesh_label">
                        ${L.translate('Invoice.account_number')}
                        <b class="yesh_value">${data.account_number || 0}</b>
                    </div>
                </div>
                <div class="yesh_section">
                    <div class="yesh_label">${L.translate(
                      'Invoice.billed_to',
                    )}</div>
                    <div class="yesh_block">
                        <div>
                            <b class="yesh_label_billed">${L.translate(
                              'Invoice.created',
                            )}</b>
                            <b class="yesh_value_billed">${
                              userData.created_at || 0
                            } </b>
                        </div>
                        <div>
                            <b class="yesh_label_billed">${L.translate(
                              'Invoice.user',
                            )}</b>
                            <b class="yesh_value_billed"> #${
                              userData.user_id || 0
                            } ${userData.first_name || 0} ${
    userData.last_name || 0
  } </b>
                        </div>
                        <div>
                            <b class="yesh_label_billed">${L.translate(
                              'Invoice.phone',
                            )}</b>
                            <b class="yesh_value_billed"> ${
                              userData.phone || 0
                            } </b>
                        </div>
                        <div>
                            <b class="yesh_label_billed">${L.translate(
                              'Invoice.post_code',
                            )} </b>
                            <b class="yesh_value_billed"> ${
                              userData.post_code || 0
                            } </b>
                        </div>
                        <div>
                            <b class="yesh_label_billed">${L.translate(
                              'Invoice.country',
                            )}</b>
                            <b class="yesh_value_billed"> ${
                              userData.country || 0
                            } </b>
                        </div>
                        <div>
                            <b class="yesh_label_billed">${L.translate(
                              'Invoice.state',
                            )}</b>
                            <b class="yesh_value_billed"> ${
                              userData.state || 0
                            } </b>
                        </div>
                        <div>
                            <b class="yesh_label_billed">${L.translate(
                              'Invoice.city',
                            )}</b>
                            <b class="yesh_value_billed"> ${
                              userData.city || 0
                            } </b>
                        </div>
                        <div>
                            <b class="yesh_label_billed">${L.translate(
                              'Invoice.street',
                            )}</b>
                            <b class="yesh_value_billed"> ${
                              userData.street || 0
                            } </b>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <div class="yesh_total_wrap">
                    <div class="yesh_total_row">
                        <span class="yesh_label">${L.translate(
                          'Invoice.description',
                        )}</span>
                        <span class="yesh_label">${L.translate(
                          'Invoice.amount',
                        )}</span>
                    </div>
                    <div class="yesh_total_row">
                        <span class="yesh_value">
                            ${checkType(data.transaction_type)} ${L.translate(
    'Invoice.account',
  )} #${data.user_id || 0}
                        </span>
                        <span class="yesh_value_left">${toCrop(2)(
                          data.amount || 0,
                        )} ${data.asset.code}</span>
                    </div>
                    <div class="yesh_total_left">
                        <span class="yesh_subtotal_label">${L.translate(
                          'Invoice.subtotal',
                        )}</span>
                        <span class="yesh_value_left">${toCrop(2)(
                          data.amount || 0,
                        )} ${data.asset.code}</span>
                    </div>
                    <div class="yesh_total_left">
                        <p class="yesh_subtotal_label">${L.translate(
                          'Invoice.tax',
                        )}</p>
                        <span class="yesh_value_left">${toCrop(2)(
                          data.fee || 0,
                        )} ${data.asset.code}</span>
                    </div>
                    <div class="yesh_main_total">
                        <div class="yesh_total_left">
                            <span class="yesh_value">${L.translate(
                              'Invoice.invoice_total',
                            )}</span>
                            <span class="yesh_value_left">
                                ${toCrop(2)(
                                  (+data?.fee || 0) + (+data?.amount || 0),
                                )} ${data.asset.code}
                            </span>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    </body>
    
    </html>`;
};

export const downloadInvoice = data => {
  window.scroll(0, 0);
  html2pdf().set(options).from(invoice(data)).save();
};
