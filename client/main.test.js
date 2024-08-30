const puppeteer = require('puppeteer')

describe('File System Explorer UI', () => {
  let browser
  let page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
    })
    page = await browser.newPage()
    await page.goto('http://127.0.0.1:5500/client/index.html')
  })

  afterAll(async () => {
    await browser.close()
  })

  test('sidebar should be rendered', async () => {
    const sidebarExists = await page.$eval('#sidebar', (el) => el !== null)
    expect(sidebarExists).toBe(true)
  }, 10000)

  test('should display correct table headers', async () => {
    await page.waitForSelector('#main table')
    const headers = await page.$$eval('#main table.file-table th', (ths) =>
      ths.map((th) => th.textContent.trim())
    )
    expect(headers).toEqual(['Name', 'Modified', 'Size'])
  }, 10000)

  test('should display at least one row of data in the table', async () => {
    await page.waitForSelector('#main table.file-table')
    const rows = await page.$$eval(
      '#main table.file-table tr',
      (trs) => trs.length
    )
    expect(rows).toBeGreaterThan(1)
  }, 10000)
})
