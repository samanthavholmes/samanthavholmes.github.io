class Calc
  def add(x,y)
    @x=x
    @y=y
    x+y
  end
end

p = Calc.new
p p.add(4,5)