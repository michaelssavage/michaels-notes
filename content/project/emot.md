---
id: 4
date: february 1, 2024
image: "/images/news.jpg"
---

# eMot

<img src="/images/emot.png" width="20%" alt="emot icon" align="right" />

My final year project was a customisable client based emotion classifier built using PYQT5 and QT Designer. The Python GUI application used data extraction, natural language processing, emotion classification, and machine learning to judge the sentiment of textual material being read online by a user.

## Technical Steps

We obtained text data by using BeautifulSoup, a text scraper, on the user's browser. Most modern web browsers store their browsing history in a SQLite database so we used scrapinghub/splash, a lightweight stateless JavaScript service, to access content on rendered sites.

We initally used sentiment analysis to determine whether data was positive, negative, or neutral before moving on to emotion classification with SciKit-Learn. We parsed and lemmatized text with SpaCy and then classified an emotion dataset with NLTK. We trained the classifier locally. We classified six basic emotions for our project; anger, fear, joy, surprise, happiness, and sadness. To prevent over or underfitting certain emotions when training the sentiment classifier we used the Pandas library to ensure that the data used to train the classifiers had an equal balance of each emotion.

Using PYQT5 and Plotly, we could display emotion data graphically using a selection of bar charts and histograms. The data displayed in real-time as you used the app thanks to thread pools in the PYQT program.

## Technologies used

Python, Git, PYQT5, SciKit-Learn, Docker, SpaCy, BeautifulSoup.

:pretty-link{ link="https://github.com/michaelssavage/eMot" text="Github Link" external isBig }
