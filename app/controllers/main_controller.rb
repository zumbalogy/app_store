class MainController < ApplicationController

    def index
    end

    def android_review
        MarketBot::Android::App.new('com.king.candycrushsaga').update
    end

end