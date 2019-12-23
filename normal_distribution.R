options(warn=-1)

##' **Normal Distribution**
###' *The Normal Distribution is member of parameters mean and variance*
###' 
###' *it has a probability density function g(x;mean,variance) ==>  k * exp(1)^((-1/(2*variance))*((x-mu)^2))*
###' 
###' *the shape of the curve is determined by exp(1)^((-1/(2*variance))*((x-mu)^2)) and k is the constant to make this equation probabaility density function.*
###' 
###' *k only changes the area under curve not the basic shape
###' 
##' *k (constant) is calculated by 1/sqrt(2 * pi * sd(x))
##' 
##' *so lets create probability density function for normal distribution*
##' 
norm_dist<-function(x){
  variance = var(x)
  st_dev = sd(x)
  mu = mean(x)
  k = 1 / sqrt(2*pi*st_dev)
  normf <- k * exp(1)^((-1/(2*variance))*((x-mu)^2))
  print(paste("k is : " ,k))
  return(normf)
}


##' *lets create a variable that ranges between -4 and 4*
x <- seq(-4, 4, length = 21)
##'
##'*plot probability densities for normal distribution for our vector*
plot(x,norm_dist(x),type="b",col="blue",main = paste("Normal Distribution"),ylab="density")


##' *Thanks: Hincal Topcuoglu*


