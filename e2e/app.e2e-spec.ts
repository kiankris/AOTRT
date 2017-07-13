import { AOTRTPage } from './app.po';

describe('aotrt App', function() {
  let page: AOTRTPage;

  beforeEach(() => {
    page = new AOTRTPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
