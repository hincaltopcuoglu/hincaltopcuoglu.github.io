options(warn=-1)

##' **Gamma Distribution**
###' *The Gamma Distribution is commonly used distribution for a continous random variable that only take values on non negative values 0 <= x < inf*
###' 
###' *it has a probability density function g(x;a,b) ==>  k*(x^(r-1))*((exp(1))^(-v*x)) for 0<= x < inf*
###' 
###' *the shape of the curve is determined by (x^(r-1))*((exp(1))^(-v*x)) and k is the constant to make this equation probabaility density function
###' 
##' *k (constant) is generalization of factorial function v^r/Fact(r)*
##' 
##' *so lets create probability density function for gamma distribution*
##' 
gamma<-function(x,r,v){
  k = (v**r)/(factorial(r))
  gammf<- k*(x^(r-1))*((exp(1))^(-v*x))
  print(paste("k is : " ,k))
  return(gammf)
}


##' *lets create a variable that ranges between 0 and inf*
x <- seq(0, 5, length = 21)
##'
##' *define a and b values*
r_v <- c(1,2,3,4,5)

##' *plot probability densities with loop*
dist<-NULL
for (r in r_v){
  for (v in r_v){
    dist<- gamma(x,r,v)
    plot(x,dist,type="b",col="blue",main = paste("Gamma (",r,",",v,")"),ylab="density")
  }
}

##' *we can see same shapes with different parameters of r,v but the area under curves are differs from each other*
##'
##' *Thanks: Hincal Topcuoglu*


