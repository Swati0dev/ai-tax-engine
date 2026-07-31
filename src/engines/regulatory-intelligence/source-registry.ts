import { IRegulatorySourceConfig } from './interfaces';

export const OFFICIAL_SOURCES_REGISTRY: IRegulatorySourceConfig[] = [
  {
    name: 'Income Tax Department',
    authority: 'CBDT',
    url: 'https://incometaxindia.gov.in',
    type: 'WEBSITE',
    category: 'INCOME_TAX',
    enabled: true,
    frequency: 'DAILY',
    priority: 1,
    parserName: 'HTML_CRAWLER'
  },
  {
    name: 'Income Tax e-Filing',
    authority: 'CBDT',
    url: 'https://eportal.incometax.gov.in',
    type: 'WEBSITE',
    category: 'INCOME_TAX',
    enabled: true,
    frequency: 'DAILY',
    priority: 1,
    parserName: 'HTML_CRAWLER'
  },
  {
    name: 'Central Board of Direct Taxes (CBDT)',
    authority: 'Ministry of Finance',
    url: 'https://cbdt.gov.in',
    type: 'WEBSITE',
    category: 'INCOME_TAX',
    enabled: true,
    frequency: 'WEEKLY',
    priority: 2,
    parserName: 'HTML_CRAWLER'
  },
  {
    name: 'GST Portal',
    authority: 'GSTN',
    url: 'https://www.gst.gov.in',
    type: 'WEBSITE',
    category: 'GST',
    enabled: true,
    frequency: 'DAILY',
    priority: 1,
    parserName: 'HTML_CRAWLER'
  },
  {
    name: 'GST Council',
    authority: 'GST Council',
    url: 'https://gstcouncil.gov.in',
    type: 'WEBSITE',
    category: 'GST',
    enabled: true,
    frequency: 'WEEKLY',
    priority: 2,
    parserName: 'HTML_CRAWLER'
  },
  {
    name: 'Central Board of Indirect Taxes and Customs (CBIC)',
    authority: 'Ministry of Finance',
    url: 'https://www.cbic.gov.in',
    type: 'WEBSITE',
    category: 'GST',
    enabled: true,
    frequency: 'DAILY',
    priority: 1,
    parserName: 'HTML_CRAWLER'
  },
  {
    name: 'Ministry of Corporate Affairs (MCA)',
    authority: 'MCA',
    url: 'https://www.mca.gov.in',
    type: 'WEBSITE',
    category: 'CORPORATE',
    enabled: true,
    frequency: 'DAILY',
    priority: 1,
    parserName: 'HTML_CRAWLER'
  },
  {
    name: 'Reserve Bank of India (RBI)',
    authority: 'RBI',
    url: 'https://www.rbi.org.in',
    type: 'WEBSITE',
    category: 'FINANCE',
    enabled: true,
    frequency: 'DAILY',
    priority: 1,
    parserName: 'HTML_CRAWLER'
  },
  {
    name: 'Employees Provident Fund Organisation (EPFO)',
    authority: 'Ministry of Labour',
    url: 'https://www.epfindia.gov.in',
    type: 'WEBSITE',
    category: 'LABOUR',
    enabled: true,
    frequency: 'WEEKLY',
    priority: 2,
    parserName: 'HTML_CRAWLER'
  },
  {
    name: 'Employees State Insurance Corporation (ESIC)',
    authority: 'Ministry of Labour',
    url: 'https://www.esic.nic.in',
    type: 'WEBSITE',
    category: 'LABOUR',
    enabled: true,
    frequency: 'WEEKLY',
    priority: 2,
    parserName: 'HTML_CRAWLER'
  },
  {
    name: 'The Gazette of India',
    authority: 'Department of Publication',
    url: 'https://egazette.gov.in',
    type: 'WEBSITE',
    category: 'GENERAL',
    enabled: true,
    frequency: 'DAILY',
    priority: 1,
    parserName: 'HTML_CRAWLER'
  },
  {
    name: 'Ministry of Finance',
    authority: 'Government of India',
    url: 'https://finmin.nic.in',
    type: 'WEBSITE',
    category: 'FINANCE',
    enabled: true,
    frequency: 'WEEKLY',
    priority: 2,
    parserName: 'HTML_CRAWLER'
  }
];
