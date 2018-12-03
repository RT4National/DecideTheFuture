class HomeController < ApplicationController

  def index
    @scorecard_corporate = {
      good: [
        { label: 'twitter', name: 'Twitter' },
        { label: 'yelp', name: 'Yelp' },
        { label: 'salesforce', name: 'Salesforce' },
        { label: 'twilio', name: 'Twilio' },
        { label: 'linkedin', name: 'LinkedIn' },
        { label: 'apple', name: 'Apple' },
        { label: 'dropbox', name: 'Dropbox' },
        { label: 'wikipedia', name: 'Wikipedia' },
        { label: 'disconnect', name: 'Disconnect' },
        { label: 'reddit', name: 'Reddit' },
        { label: 'automattic', name: 'Automattic' },
        { label: 'credomobile', name: 'CREDO' },
        { label: 'mozilla', name: 'Mozilla' },
        { label: 'privateinternetaccess', name: 'Private Internet Access' },
        { label: 'duckduckgo', name: 'DuckDuckGo' },
        { label: 'yahoo', name: 'Yahoo' },
        { label: 'adobe', name: 'Adobe' },
        { label: 'amazon', name: 'Amazon' },
        { label: 'dell', name: 'Dell' },
        { label: 'ebay', name: 'eBay' },
        { label: 'google', name: 'Google' },
        { label: 'microsoft', name: 'Microsoft' },
        { label: 'netflix', name: 'Netflix' },
        { label: 'oracle', name: 'Oracle' }
      ],
      bad: [
        { label: 'facebook', name: 'Facebook', scoring: ['good', 'good', 'bad'] },
        { label: 't-mobile', name: 'T-Mobile', scoring: ['good', 'bad', 'bad'] },
        { label: 'expedia', name: 'Expedia', scoring: ['bad', 'good', 'bad'] },
        { label: 'priceline', name: 'Priceline', scoring: ['bad', 'bad', 'bad'] },
        { label: 'intel', name: 'Intel', scoring: ['good', 'good', 'bad'] },
        { label: 'att', name: 'AT&T', scoring: ['good', 'bad', 'bad'] },
        { label: 'verizon', name: 'Verizon', scoring: ['bad', 'bad', 'bad'] },
        { label: 'hp', name: 'HP', scoring: ['good', 'good', 'bad'] },
        { label: 'comcast', name: 'Comcast', scoring: ['bad', 'good', 'bad'] },
        { label: 'ibm', name: 'IBM', scoring: ['good', 'good', 'bad'] },
        { label: 'cisco', name: 'Cisco', scoring: ['good', 'good', 'bad'] },
        { label: 'xerox', name: 'Xerox', scoring: ['bad', 'bad', 'bad'] }
      ]
    }
  end
end
