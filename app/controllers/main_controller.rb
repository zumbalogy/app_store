class MainController < ApplicationController

    def index
    end

    def android_review
        app = MarketBot::Android::App.new(params[:app])
        output = []
        begin
            app = app.update
            html = Nokogiri::HTML(app.html)
            reviews = html.css('.single-review')
            reviews.each do |review|
                output << {
                    review: review.css('.review-body').children[1..2].to_s,
                    time:  review.css('.review-date').children.to_s
                }
            end
        rescue
        end
        render json: output
    end

end