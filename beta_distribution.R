options(warn=-1)

##' **Beta Distribution**
###' *The Beta Distribution is commonly used distribution for a continous random variable that only take values betweeen 0 <= x <= 1*
###' 
###' *it has a probability density function g(x;a,b) ==>  k*(x^(a-1))*((1-x)^(b-1)) for 0<= x <=1*
###' 
###' *the shape of the curve is determined by (x^(a-1))*((1-x)^(b-1)) and k is the constant to make this equation probabaility density function
###' 
##' *k (constant) is generalization of factorial function Fact(a+b)/Fact(a)*Fact(b)
##' 
##' * so lets create probability density function for beta distribution*
##' 
beta<-function(x,a,b){
  betaf<-(factorial(a+b)/(factorial(a)*factorial(b)))*(x^(a-1))*((1-x)^(b-1))
  return(betaf)
}


##' *lets create a variable that ranges between 0 and 1*
x <- seq(0, 1, length = 21)
##'
##' *define a and b values*
a_b <- c(0.5,1,2,3,4,5)

##' *plot probability densities with loop*
dist<-NULL
for (a in a_b){
  for (b in a_b){
    dist<- beta(x,a,b)
    plot(x,dist,type="b",col="blue",main = paste("Beta (",a,",",b,")"),ylab="density")
  }
}

##' *Thanks: Hincal Topcuoglu*




