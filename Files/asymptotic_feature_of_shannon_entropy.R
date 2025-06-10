library(plyr)

##' **define shannon entropy**
shannon_entropy <- function(x){
  df = count(x)
  n = length(x)
  df$probs = df$freq / n
  se<- -sum(df$probs * log(df$probs))
  return(se)
}



##' * create numbers between 1000 and 100000 and get shannon entropy results and then plot it**
discrete_normal_arr<-NULL
for ( i in seq(1000,100000,10)){
  discrete_normal_arr[i]<-shannon_entropy(round(rnorm(i, 500, 10), 0))
}


hist(discrete_normal_arr, prob=TRUE, ylim=c(0,150), breaks=50)
curve(dnorm(x, mean(discrete_normal_arr), sd(discrete_normal_arr)), add=TRUE, col="darkblue", lwd=2)

##' *Yes thats'it :)*