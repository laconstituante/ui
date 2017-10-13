import { LaconstituantePage } from './app.po';

describe('laconstituante App', () => {
  let page: LaconstituantePage;

  beforeEach(() => {
    page = new LaconstituantePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
