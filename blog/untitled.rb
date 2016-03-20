






      array = ["cat", "dog", "bird"]
      array.each do |animal|
        puts animal
      end
















    class Animal

      def initialize (sound, color, number_of_legs)
        @sound = sound
        @color = color
        @number_of_legs = number_of_legs
      end

    end









    pig = Animal.new("oink", "pink", 4)


















    class Animal

      attr_reader :sound
      attr_accessor :color, :number_of_legs

      def initialize (sound, color, number_of_legs)
        @sound = sound
        @color = color
        @number_of_legs = number_of_legs
      end

      def greet
        puts "#{@sound.capitalize}, I'm #{@color} and I have #{@number_of_legs} number of legs!"
      end

    end




















