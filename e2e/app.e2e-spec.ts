import { QuizgiriClientappPage } from './app.po';

describe('quizgiri-clientapp App', () => {
  let page: QuizgiriClientappPage;

  beforeEach(() => {
    page = new QuizgiriClientappPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
